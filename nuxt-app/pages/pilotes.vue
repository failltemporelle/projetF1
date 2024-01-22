<template>
  <navbar />
  <slot />

  <h1 class="text-center">Liste des pilotes</h1>
  <div class="flex flex-row flex-wrap place-content-center">
    <div class="p-4 " v-for="item in f1.points" :key="item.Driver.driverId">
      <div class="rounded-lg bg-card text-card-foreground bg-secondary card hover:shadow-lg transition-shadow" data-v0-t="card">
        <div class="items-center text-center">
          <span class="indicator indicator-item badge badge-base-100 text-primary-content font-bold m-2">
          {{ item.position }}
        </span>
        <span class="indicator indicator-item badge badge-base-100 text-primary-content font-bold">
          {{ item.points }} Points
        </span>
        
      </div>
        <div class="flex flex-col space-y-1.5 p-6 items-center text-center">
          <p class="card-title mb-2 text-primary-content ">{{ item.Driver.givenName }} {{ item.Driver.familyName }}</p>
          <img :src="getUrl(item.Driver.driverId)" alt="Image du pilote" class="mx-auto lg:block hidden" width="200" height="100">
          <progress class="progress w-50 bg-accent" :value="item.points" :max="f1.pointMax"></progress>
          <button class="btn btn-sm"> <NuxtLink :to="`/pilote/${item.Driver.driverId}`">
            <span class="text-sm font-medium hover:underline underline-offset-4 text-xs button">Informations</span>
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
const getUrl = (item) => {
  return new URL(`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/pilotes/` + item + `.png`, import.meta.url).href;
};
const getPoints = async () => {
  try {
    const response = await fetch("https://ergast.com/api/f1/2023/driverStandings.json");
    const data = await response.json();
    f1.value.points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    f1.value.pointMax = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
    console.log(f1.value.points);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
};

onMounted(getPoints);
</script>


<style> 
.card {
background-color: #e4d8b4;
background-image: linear-gradient(0deg, #e4d8b4 0%, #c4e4ce 100%);
 }

 .img {
   border-radius: 10px;
   border-color: #1b1c1c;
 }
</style>
