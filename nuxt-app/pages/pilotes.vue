<template>
  <navbar />
  <div class="flex flex-row flex-wrap place-content-center">
    <div v-for="item in this.f1.points" class="card w-60 bg-red-700 shadow-xl ml-6 mt-6">
      <span class="indicator-item badge badge-primary text-teal-50 content-end">{{ item.points }} Points </span>
      <h2 class="card-title">{{ item.Driver.givenName }} {{ item.Driver.familyName }}</h2>
      <figure><img
          :src="`https://raw.githubusercontent.com/failltemporelle/Projetp/main/f1-app/assets/pilotes/${item.Driver.driverId}.png`">
      </figure>
      <div class="card-body">
        <progress class="progress w-50" :value=item.points max="454"></progress>
      </div>
    </div>
  </div>
</template>
<script>
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
      fetch("https://ergast.com/api/f1/2022/driverStandings.json")
        .then((response) => response.json())
        .then((data) => {
          this.f1.points =   data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        });
    },

    getUrl(img) {
      return (`@/assets/${item.Driver.driverId}.png`);
    }
  },
};
</script>
