<template>
  <navbar />
  <div class="flex flex-row flex-wrap place-content-center">
    <div class="p-4" v-for="item in this.f1.ecuries">
      <div class="rounded-lg bg-card text-card-foreground bg-secondary card hover:shadow-lg transition-shadow"
        data-v0-t="card">

        <div class="items-center text-center">
          <span class="indicator indicator-item badge badge-base-100 text-primary-content font-bold">
            {{ item.points }} Points
          </span>
        </div>
        <div class="flex flex-col space-y-1.5 p-6 items-center text-center">
          <p class="card-title mb-2 text-primary-content">{{ item.Constructor.name }}</p>
          <img
            :src="`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/ecuries/${item.Constructor.constructorId}.png`" class="mx-auto" width="200" height="100">
        </div>
        <button class="btn btn-sm"> <NuxtLink :to="`/ecurieDetails/${item.Constructor.constructorId}`">
            <span class="text-sm font-medium hover:underline underline-offset-4 text-xs button">Informations</span>
          </NuxtLink></button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>

export default {
  created() {
    this.getpointE();
  },
  data() {
    return {
      f1: {
        ecuries: [],
      },
    };
  },
  methods: {
    getpointE() {
      this.f1.points = [];
      fetch("https://ergast.com/api/f1/2024/constructorStandings.json")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.f1.ecuries =
            data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
          console.log(this.f1.ecuries);
        });
    },
  },
};
</script>
<style> 

 img {
   border-radius: 10px;
   border-color: #1b1c1c;
 }
</style>
