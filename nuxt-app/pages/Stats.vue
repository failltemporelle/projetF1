<template>
    <Navbar/>
    <div v-if="loading" class="text-lg">Chargement... </div>
    <Completion />
    <div class="bg-secondary text-primary-content rounded-xl card hover:shadow-lg transition-shadow p-6 m-6 bg-base-100">
        <canvas id="pointsChart"></canvas>
   
</div>
    <Footer />
</template>
    
<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const driverStandings = ref([]);

const fetchDriverStandings = async () => {
    try {
        const response = await fetch('https://ergast.com/api/f1/2024/driverStandings.json');
        const data = await response.json();
        driverStandings.value = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        createChart(); // Créer le graphique après le chargement des données
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
    }
};

const createChart = () => {
    const ctx = document.getElementById('pointsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: driverStandings.value.map(driver => driver.Driver.familyName),
            datasets: [{
                label: 'Points par pilote',
                data: driverStandings.value.map(driver => parseInt(driver.points)), // Assurez-vous que les points sont des entiers
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

onMounted(fetchDriverStandings); // Appelez seulement fetchDriverStandings ici
</script>
    