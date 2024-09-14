<template>
  <navbar />
  <div class="flex flex-row flex-wrap place-content-center">
    <div class="p-4" v-for="item in this.f1.ecuries" :key="item.Constructor.constructorId">
      <div class="rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 text-white card hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
        <!-- Points -->
        <div class="items-center text-center">
          <span class="indicator badge bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold p-2 rounded-full shadow-lg">
            {{ item.points }} Points
          </span>
        </div>

        <!-- Nom de l'écurie et image -->
        <div class="flex flex-col space-y-4 p-6 items-center text-center">
          <p class="card-title mb-2 text-3xl font-bold uppercase tracking-wider">{{ item.Constructor.name }}</p>
          <img
            :src="`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/ecuries/${item.Constructor.constructorId}.png`"
            class="rounded-lg shadow-2xl hover:scale-110 transition-transform duration-300 mx-auto"
            width="300" height="auto"
          >
        </div>

        <!-- Bouton d'information -->
        <NuxtLink :to="`/ecurieDetails/${item.Constructor.constructorId}`">
          <button class="btn bg-gradient-to-r from-indigo-500 to-purple-500 text-white mt-4 py-2 px-6 rounded-full hover:opacity-90 transition-opacity">
            <span class="text-sm font-semibold">Voir les détails</span>
          </button>
        </NuxtLink>
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
          this.f1.ecuries = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        });
    },
  },
};
</script>

<style scoped>
/* Styles globaux pour l'image */
img {
  border-radius: 16px;
  border: 3px solid #2c2e33;
  transition: transform 0.4s ease-in-out;
}

/* Styles de la carte */
.card {
  border-radius: 18px;
  background: linear-gradient(145deg, #1c1e22 0%, #2b2f36 100%);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

/* Effet de survol de la carte */
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

/* Bouton de style */
.btn {
  background-color: #3b82f6; /* Primary blue */
  transition: background-color 0.4s ease, opacity 0.4s ease;
}

.btn:hover {
  opacity: 0.85;
}

/* Style pour les badges de points */
.badge {
  background-color: #6366f1; /* Slight gradient blue */
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.badge:hover {
  background-color: #a78bfa; /* Purple */
  cursor: default;
}
</style>
