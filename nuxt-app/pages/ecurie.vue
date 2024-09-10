<template>
  <navbar />
  <div class="flex flex-row flex-wrap place-content-center">
    <div class="p-4" v-for="item in this.f1.ecuries" :key="item.Constructor.constructorId">
      <div class="rounded-xl bg-gradient-to-r from-gray-800 to-gray-600 text-white card hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
        <!-- Points -->
        <div class="items-center text-center">
          <span class="indicator indicator-item badge bg-gray-100 text-black font-bold p-2 rounded-full shadow-md">
            {{ item.points }} Points
          </span>
        </div>
        
        <!-- Nom de l'écurie et image -->
        <div class="flex flex-col space-y-1.5 p-6 items-center text-center">
          <p class="card-title mb-2 text-2xl font-bold">{{ item.Constructor.name }}</p>
          <img
            :src="`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/ecuries/${item.Constructor.constructorId}.png`" 
            class="rounded-md shadow-lg transition-transform hover:scale-110 duration-300 mx-auto" width="300" height="auto">
        </div>
        
        <!-- Bouton d'information -->
        <button class="btn btn-sm bg-gray-800 text-white mt-4 py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">
          <NuxtLink :to="`/ecurieDetails/${item.Constructor.constructorId}`">
            <span class="text-sm font-medium hover:underline underline-offset-4">Informations</span>
          </NuxtLink>
        </button>
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
<style scoped>
/* Global styles for image */
img {
  border-radius: 12px;
  border: 2px solid #1b1c1c;
  transition: transform 0.3s ease;
}

/* Card container styles */
.card {
  border-radius: 15px;
  background: linear-gradient(135deg, #2f3e46 0%, #354f52 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

/* Hover effects */
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.btn {
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #1c1c1c;
}

</style>
