<template>
  <Navbar />
  <div class="bg-secondary text-primary-content rounded-xl card hover:shadow-lg transition-shadow p-6 m-6">
    <div class="flex justify-between items-center px-8 py-4">
      <div class="space-y-2">
      </div>
    </div>
    <div class="flex items-center justify-between px-8 py-4">
      <div class="flex flex-col">
        <div v-if="selectedDriver">
          <h1 class="text-6xl font-bold">{{ selectedDriver.Constructors[0].name }}</h1>
        </div>
        <div class="flex items-center space-x-2">
          <div :class="numberColorClass(f1.pilote.driverId)" class="text-6xl font-bold">
            {{ f1.pilote.permanentNumber }} </div>
          <div>
            <h2 class="text-4xl font-bold">{{ f1.pilote.givenName }} {{ f1.pilote.familyName }}</h2>
            <p>{{ f1.pilote.nationality }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl bg-primary card hover:shadow-lg transition-shadow"><img :src="getUrl2(f1.pilote.driverId)"
          width="400">
      </div>
    </div>
  </div>
  <div class="bg-secondary text-primary-content rounded-xl card hover:shadow-lg transition-shadow p-6 m-6">
    <canvas ref="canvas"></canvas>
  </div>
  <Footer />
</template>

<script setup>
import { Chart, registerables } from 'chart.js';
import { ref, onMounted, watch } from 'vue';

Chart.register(...registerables);

const f1Standings = ref(null);
const selectedDriver = ref(null);
const dataPoints = ref([]);
const canvas = ref(null);
const chart = ref(null);

const fetchData = async () => {
  var idPilote = getUrl();
  try {
    const response = await fetch(`https://ergast.com/api/f1/drivers/${idPilote}/driverStandings.json`);
    const data = await response.json();
    const standings = data.MRData.StandingsTable.StandingsLists;
    const pointsPerSeason = standings.map(s => ({
      year: s.season,
      points: parseInt(s.DriverStandings[0].points)
    }));
    dataPoints.value = pointsPerSeason;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
watch(dataPoints, (newData) => {
  if (chart.value) {
    chart.value.destroy();
  }
  chart.value = new Chart(canvas.value.getContext('2d'), {
    type: 'line',
    data: {
      labels: newData.map(item => item.year),
      datasets: [{
        label: 'Points par saison',
        data: newData.map(item => item.points),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderRadius: 5,
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
});



const f1 = ref({
  pilote: {},
  course: [],
});

const getUrl2 = (item) => {
  return new URL(`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/pilotes/` + item + `.png`, import.meta.url).href;
};

const getUrl = () => {
  var url = new URL(window.location.href);
  var urlsplit = url.pathname.split("/");
  var idpilote = urlsplit[2];
  return idpilote;
};

const getPilote = async () => {
  var idPilote = getUrl();
  try {
    const response = await fetch(`https://ergast.com/api/f1/drivers/${idPilote}.json`);
    const data = await response.json();
    f1.value.pilote = data.MRData.DriverTable.Drivers[0];
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
};

const fetchDriverStandings = async () => {
  try {
    const response = await fetch(`https://ergast.com/api/f1/current/driverStandings.json`);
    const data = await response.json();
    f1Standings.value = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
};

function numberColorClass(number) {
  console.log(number);
  if (number == "max_verstappen" || number == "perez" || number == "leclerc" || number == "sainz" ){
    return "text-red-700 bg-blue-500 rounded-sm";
  }
  if (number == "hamilton"){
    return "text-yellow-300 bg-violet-600 rounded-xl";
  }
  if (number == "alonso" || number == "stroll"){
    return "text-green-800";
  }
  if (number == "norris" || number == "piastri"){
    return "text-orange-600";
  }
  if (number == "russell"){
    return "text-blue-500";
  }
  if (number == "ocon" || number == "gasly"){
    return "text-pink-300";
  }
}

const findDriver = (driverId) => {
  if (!f1Standings.value) return null;
  return f1Standings.value.find(driver => driver.Driver.driverId === driverId);
};
onMounted(() => {
  fetchData();
});
onMounted(getUrl2);
onMounted(getPilote);
onMounted(async () => {
  await fetchDriverStandings();
  var idpilote = getUrl();
  selectedDriver.value = findDriver(idpilote);
});

</script>


<style> .card {
   background-color: #e4d8b4;
   background-image: linear-gradient(0deg, #e4d8b4 0%, #c4e4ce 100%);
 }

 .img {
   border-radius: 10px;
   border-color: #1b1c1c;
 }
</style>
 









