<template>
    <Navbar />
    <div class="flex flex-row flex-wrap place-content-center">

    <!-- Grille de cartes -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"> -->
      
      <!-- Carte des 3 premiers pilotes -->
      <div v-if="topDrivers.length" class="bg-white rounded-lg shadow-lg p-6 card">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Top 3 Pilotes</h2>
          <button class="text-gray-500 hover:text-gray-700">Voir Rapport</button>
        </div>
        <ul>
          <li v-for="(driver, index) in topDrivers" :key="index" class="mb-4">
            <p class="text-lg font-semibold">{{ driver.Driver.familyName }} ({{ driver.Constructors[0].name }})</p>
            <p class="text-sm text-gray-500">Points: {{ driver.points }}</p>
          </li>
        </ul>
      </div>
  
      <!-- Carte des 3 premières écuries -->
      <div v-if="topConstructors.length" class="bg-white rounded-lg shadow-lg p-6 card">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Top 3 Écuries</h2>
        </div>
        <ul>
          <li v-for="(team, index) in topConstructors" :key="index" class="mb-4">
            <p class="text-lg font-semibold">{{ team.Constructor.name }}</p>
            <p class="text-sm text-gray-500">Points: {{ team.points }}</p>
          </li>
        </ul>
      </div>
      </div>
  
      <!-- Carte du graphique des points des pilotes -->
      <div class="bg-white rounded-lg shadow-lg p-6 card">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Points par Pilote</h2>
        </div>
        <canvas id="pointsChart"></canvas>
      </div>
      
    <!-- </div> -->
  
    <Footer />
  </template>


<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const topDrivers = ref([]);
const topConstructors = ref([]);
const driverStandings = ref([]);
const loading = ref(true);

// Fonction pour récupérer les données des pilotes
const fetchDriverStandings = async () => {
  try {
    const response = await fetch('http://ergast.com/api/f1/current/driverStandings.json');
    const data = await response.json();
    const allDrivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    // Récupérer seulement les 3 premiers pilotes
    topDrivers.value = allDrivers.slice(0, 3);

    // Pour le graphique, utiliser toutes les données de pilotes
    driverStandings.value = allDrivers;

    createChart(); // Créer le graphique après le chargement des données
    loading.value = false;
  } catch (error) {
    console.error('Erreur lors de la récupération des données des pilotes', error);
  }
};

// Fonction pour récupérer les données des écuries
const fetchConstructorStandings = async () => {
  try {
    const response = await fetch('http://ergast.com/api/f1/current/constructorStandings.json');
    const data = await response.json();
    const allConstructors = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    // Récupérer seulement les 3 premières écuries
    topConstructors.value = allConstructors.slice(0, 3);
  } catch (error) {
    console.error('Erreur lors de la récupération des données des écuries', error);
  }
};

// Fonction pour créer le graphique des points par pilote
const createChart = () => {
  const ctx = document.getElementById('pointsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: driverStandings.value.map(driver => driver.Driver.familyName),
      datasets: [{
        label: 'Points par pilote',
        data: driverStandings.value.map(driver => parseInt(driver.points)), // Assurez-vous que les points sont des entiers
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        borderRadius: 10
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
};

// Appeler les fonctions au montage du composant
onMounted(() => {
  fetchDriverStandings();
  fetchConstructorStandings();
});
</script>


<style scoped>
/* Styles globaux */
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f4f5f7;
}

/* Carte */
.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
}

/* Titre */
h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

/* Bouton de rapport */
button {
  font-size: 0.875rem;
  color: #888;
  cursor: pointer;
  border: none;
  background: none;
  transition: color 0.2s;
}

button:hover {
  color: #333;
}

/* Système de grille */
/* Grille avec des colonnes responsives */
.grid {
  display: grid;
  gap: 1.5rem; /* Espace entre les cartes */
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr)); /* 1 colonne par défaut */
}

@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* 2 colonnes pour les écrans moyens */
  }
}

@media (min-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr)); /* 3 colonnes pour les grands écrans */
  }
}

/* Couleurs pastel et effets de texte */
.text-green-500 {
  color: #48bb78;
}

.text-gray-500 {
  color: #a0aec0;
}
</style>
