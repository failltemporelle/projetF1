<template>


  <navbar />
  <div>
    <div class="flex flex-row flex-wrap place-content-center">
      <div v-for="item in this.f1.ecuries" class="card w-60 bg-red-700 shadow-xl ml-6 mt-6">
        <span class="indicator-item badge badge-primary text-teal-50 content-end">{{ item.points }} Points </span>
        <div class="card-body">
          <p class="font-bold">{{ item.Constructor.name }}</p>
          <progress class="progress w-50" :value=item.points max="583" />
          <img :src="`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/ecuries/${item.Constructor.constructorId}.png`">
        </div>
      </div>
    </div>
  </div>
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