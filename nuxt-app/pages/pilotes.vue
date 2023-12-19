<!-- 
<template>
  <navbar />
  <slot />
  <h1 class="text-center"> Liste des pilotes</h1>
  <div class="flex flex-row flex-wrap place-content-center">
    <div v-for="item in this.f1.points" class="card w-60 bg-red-700 shadow-xl ml-6 mt-6">
      <div class="items-center text-center">
        <span class="items-center text-center indicator indicator-item badge badge-primary text-teal-50 content-start">{{
          item.points }} Points </span>
      </div>
      <div class="card-body items-center text-center min-height: 0px;">
        <h2 class="card-title text-white">{{ item.Driver.givenName }} {{ item.Driver.familyName }}</h2>
      </div>
      <figure><img
          :src="`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/pilotes/${item.Driver.driverId}.png`">
      </figure>
      <div class="card-body">
        <progress class="progress w-50" :value=item.points max="433"></progress>
      </div>
    </div>
  </div>
</template>
<script>
var script = document.createElement('script'); script.dataset.cache = true; script.dataset.websiteId = '6dc26c0f-0d76-46f8-8bb2-14e706229e91'; script.src = 'https://s.abla.io/abla.js'; document.getElementsByTagName('head')[0].appendChild(script);
export default {
  created() {
    this.getpoints();
  },
  data() {
    return {
      f1: {
        driver: [],
        points: [],
        ecuries: [],
        pointMax: [],
      },
    };
  },


  methods: {
    getpoints() {
      this.f1.ecuries = [];
      fetch("https://ergast.com/api/f1/2023/driverStandings.json")
        .then((response) => response.json())
        .then((data) => {
          this.f1.points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          this.f1.pointMax = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
        });
    },

    getUrl(img) {
      return (`@/assets/${item.Driver.driverId}.png`);
    }
  },
};
</script>

<style> .card {
   background-color: #21D4FD;
   background-image: -webkit-linear-gradient(19deg, #fd1504 0%, #1b1c1c 100%);
   background-image: -moz-linear-gradient(19deg, #fd1504 0%, #1b1c1c 100%);
   background-image: -o-linear-gradient(19deg, #fd1504 0%, #1b1c1c 100%);
   background-image: linear-gradient(19deg, #fd1504 0%, #1b1c1c 100%);
 }

 .img {
   border-radius: 10px;
   border-color: #1b1c1c;
 }
</style> -->

<template>
  <navbar />
  <slot />
  <h1 class="text-center">Liste des pilotes</h1>
  <div class="flex flex-row flex-wrap place-content-center">
    <div v-for="item in f1.points" :key="item.Driver.driverId" class="card w-60 bg-red-700 shadow-xl ml-6 mt-6">
      <div class="items-center text-center">
        <span class="indicator indicator-item badge badge-primary text-teal-50 content-start">
          {{ item.points }} Points
        </span>
      </div>
      <div class="card-body items-center text-center min-height: 0px;">
        <h2 class="card-title text-white">{{ item.Driver.givenName }} {{ item.Driver.familyName }}</h2>
      </div>
      <figure>
        <img :src="getUrl(item.Driver.driverId)" alt="Image du pilote">
      </figure>
      <div class="card-body">
        <progress class="progress w-50" :value="item.points" :max="f1.pointMax"></progress>
      </div>
    </div>
  </div>
</template>




<script setup>
import { ref, onMounted } from 'vue';

const f1 = ref({
  driver: [],
  points: [],
  ecuries: [],
  pointMax: null,
});

const getPoints = async () => {
  try {
    const response = await fetch("https://ergast.com/api/f1/2023/driverStandings.json");
    const data = await response.json();
    f1.value.points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    f1.value.pointMax = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
    console.log(f1.value.pointMax);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
};

onMounted(getPoints);

const getUrl = (item) => {
  return new URL(`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/pilotes/`+item+`.png`, import.meta.url).href;
};
</script>


<style> .card {
  background-color: #21D4FD;
  background-image: -webkit-linear-gradient(19deg, #fd1504 0%, #1b1c1c 100%);
  background-image: -moz-linear-gradient(19deg, #fd1504 0%, #1b1c1c 100%);
  background-image: -o-linear-gradient(19deg, #fd1504 0%, #1b1c1c 100%);
  background-image: linear-gradient(19deg, #fd1504 0%, #1b1c1c 100%);
}

.img {
  border-radius: 10px;
  border-color: #1b1c1c;
}
</style>
