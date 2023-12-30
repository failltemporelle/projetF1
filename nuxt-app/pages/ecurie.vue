<template>
  <navbar />
  <div class="flex flex-row flex-wrap place-content-center">
    <div class="p-4" v-for="item in this.f1.ecuries">
      <div class="rounded-lg border bg-card text-card-foreground shadow-lg" data-v0-t="card">
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="text-2xl font-semibold text-gray-600">{{ item.points }} Points</h3>
          <p class="text-md font-light mb-2">{{ item.Constructor.name }}</p>
            <img
            :src="`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/ecuries/${item.Constructor.constructorId}.png`" class="mx-auto" width="200" height="100">
        </div>
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
        driver: [],
        points: [],
        ecuries: [],
      },
    };
  },
  methods: {
    getpointE() {
      this.f1.points = [];
      fetch("https://ergast.com/api/f1/2023/constructorStandings.json")
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
}
</style>