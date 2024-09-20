<template>
  <Navbar />
  <div class="landing-page">
    <!-- Section Hero -->
    <section class="hero-section">
      <div class="container">
        <h1>Formula 1 - Classements et Informations sur les Courses</h1>
        <p>Découvrez le classement actuel, les résultats des saisons passées et les détails des courses de la saison en cours.</p>
      </div>
    </section>

    <!-- Section Classement Actuel des Pilotes -->
    <section class="current-standings-section">
      <div class="container">
        <h2>Classement Actuel des Pilotes</h2>
        <div class="cards-container">
          <div class="card" v-for="driver in currentStandings" :key="driver.Driver.driverId">
            <p><strong>{{ driver.position }}.</strong> {{ driver.Driver.givenName }} {{ driver.Driver.familyName }}</p>
            <p>Points : {{ driver.points }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Classement Actuel des Écuries -->
    <section class="current-standings-section">
      <div class="container">
        <h2>Classement Actuel des Écuries</h2>
        <div class="cards-container">
          <div class="card" v-for="constructor in currentStandingsConstructor" :key="constructor.Constructor.constructorId">
            <p><strong>{{ constructor.position }}.</strong> {{ constructor.Constructor.name }}</p>
            <p>Points : {{ constructor.points }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Prochaine Course -->
    <section>
      <div class="container">
        <section v-if="nextRace">
          <h2>Prochaine Course</h2>
          <div class="next-race-card">
            <p><strong>{{ nextRace.raceName }}</strong> - {{ formatDate(nextRace.date) }}</p>
            <p>{{ nextRace.Circuit.circuitName }} ({{ nextRace.Circuit.Location.locality }}, {{ nextRace.Circuit.Location.country }})</p>
          </div>
        </section>
        <section v-else>
          <p>Aucune course à venir trouvée.</p>
        </section>
      </div>
    </section>
  </div>
  <Footer />
</template>



<script setup>
import { ref, onMounted } from 'vue';

// Références pour stocker les données récupérées
const currentStandings = ref([]);
const currentStandingsConstructor = ref([]);
const nextRace = ref(null);

// Fonction pour récupérer le classement des pilotes
const fetchCurrentStandings = async () => {
  try {
    const response = await fetch('http://ergast.com/api/f1/current/driverStandings.json');
    const data = await response.json();
    currentStandings.value = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 3);
  } catch (error) {
    console.error('Erreur lors de la récupération des classements :', error);
  }
};

// Fonction pour récupérer le classement des écuries
const fetchCurrentStandingsConstructor = async () => {
  try {
    const response = await fetch('http://ergast.com/api/f1/current/constructorStandings.json');
    const data = await response.json();
    currentStandingsConstructor.value = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.slice(0, 3);
  } catch (error) {
    console.error('Erreur lors de la récupération des écuries:', error);
  }
};

// Fonction pour récupérer la prochaine course
const fetchNextRace = async () => {
  try {
    const response = await fetch('http://ergast.com/api/f1/current.json');
    const data = await response.json();
    const races = data.MRData.RaceTable.Races;
    const today = new Date();

    // Filtre les courses futures en fonction de la date
    const upcomingRaces = races.filter(race => new Date(race.date) > today);

    // Affiche la première course à venir
    if (upcomingRaces.length > 0) {
      nextRace.value = upcomingRaces[0];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la prochaine course:', error);
  }
};

// Fonction de formatage de la date
const formatDate = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Appel des fonctions lors du montage du composant
onMounted(() => {
  fetchCurrentStandings();
  fetchCurrentStandingsConstructor();
  fetchNextRace();
});
</script>


<style scoped>
.landing-page {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

.hero-section {
  background-image: url('https://example.com/f1-background.jpg');
  background-size: cover;
  color: white;
  text-align: center;
  padding: 80px 0;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.5);
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.current-standings-section {
  margin-top: 50px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-10px);
}

.card p {
  margin: 10px 0;
}

.next-race-card {
  background-color: #ff4c4c;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.next-race-card p {
  margin: 5px 0;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
}

footer {
  text-align: center;
  padding: 20px;
  background-color: #222;
  color: white;
  margin-top: 50px;
}

</style>
