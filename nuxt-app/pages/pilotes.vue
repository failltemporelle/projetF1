<template>
  <navbar />
  <slot />

  <h1 class="text-center">Liste des pilotes</h1>
  <div class="flex flex-row flex-wrap place-content-center">
    <div class="p-4" v-for="item in f1.points" :key="item.Driver.driverId">
      <div class="rounded-lg border bg-card text-card-foreground shadow-lg bg-secondary" data-v0-t="card">
        <div class="items-center text-center">
        <span class="indicator indicator-item badge badge-primary text-teal-50 content-start">
          {{ item.points }} Points
        </span>
      </div>
        <div class="flex flex-col space-y-1.5 p-6 items-center text-center">
          <p class="card-title mb-2 text-neutral-content ">{{ item.Driver.givenName }} {{ item.Driver.familyName }}</p>
          <img :src="getUrl(item.Driver.driverId)" alt="Image du pilote" class="mx-auto" width="200" height="100">
          <progress class="progress w-50 bg-primary" :value="item.points" :max="f1.pointMax"></progress>
          <button class="btn btn-sm"> <NuxtLink :to="`/testt/${item.Driver.driverId}`">
            <span class="text-sm font-medium hover:underline underline-offset-4 text-xs">Informations</span>
          </NuxtLink></button>
            </div>
      </div>
    </div>
  </div>
  <Footer />
</template>




<script setup>
import { ref, onMounted } from 'vue';
const f1 = ref({
  points: [],
  pointMax: null,
});

const getPoints = async () => {
  try {
    const response = await fetch("https://ergast.com/api/f1/2023/driverStandings.json");
    const data = await response.json();
    f1.value.points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    f1.value.pointMax = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
};

onMounted(getPoints);

const getUrl = (item) => {
  return new URL(`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/pilotes/` + item + `.png`, import.meta.url).href;
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
