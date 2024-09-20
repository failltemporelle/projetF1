<template>
  <navbar />
  <slot />
  
  <div class="flex justify-center items-center my-4">
    <button class="btn btn-xs btn-error text-white text-bold" @click="changeYear(-1)">Année précédente</button>
    <button class="btn btn-xs ml-4 text-bold" @click="changeYear(1)">Année suivante</button>
  </div>

  <div class="flex flex-row flex-wrap place-content-center">
    <div class="p-3 m-2 w-full md:w-auto" v-for="item in f1.points" :key="item.Driver.driverId">
      <div class="card-container">
        <div class="card-inner">
          <div :class="['card-front', getCardClass(item.position)]">
            <div class="rounded-lg text-card-foreground card hover:shadow-lg transition-shadow">
              <div class="items-center text-center relative">
                <span class="indicator indicator-item badge font-bold m-2 text-red-800">
                  {{ item.position }}
                </span>
                <span class="indicator indicator-item badge font-bold bg-gray-200 text-black p-2 rounded-full">
                  {{ item.points }} Points
                </span>
              </div>

              <div class="flex flex-col space-y-1.5 p-6 items-center text-center">
                <p class="card-title mb-2 text-xl md:text-2xl text-bold text-zinc-900 font-bold">
                  {{ item.Driver.givenName }} {{ item.Driver.familyName }}
                </p>

                <div class="relative">
                  <img :src="getUrl(item.Driver.driverId)" alt="Image du pilote" class="mx-auto lg:block hidden" width="200" height="100">
                </div>

                <progress class="progress w-full md:w-50 bg-red-600" :value="item.points" :max="f1.pointMax"></progress>

                <p class="text-sm text-gray-700 mt-2"><strong>Équipe:</strong> {{ item.Constructors[0].name }}</p>
                <p class="text-sm text-gray-700"><strong>Victoires:</strong> {{ item.wins }}</p>
              </div>
            </div>
          </div>

          <div class="card-back">
            <div class="rounded-lg text-card-foreground card hover:shadow-lg transition-shadow p-6 flex flex-col items-center justify-center space-y-4">
              <p class="text-xl text-gray-800 font-bold text-center">
                Détails sur {{ item.Driver.givenName }} {{ item.Driver.familyName }}.
              </p>
              <div class="text-center">
                <p class="text-md text-gray-600"><strong>Origine :</strong> {{ item.Driver.nationality }}</p>
                <p class="text-md text-gray-600"><strong>Naissance :</strong> {{ item.Driver.dateOfBirth }}</p>
              </div>
              <div class="flex justify-center">
                <img :src="`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/ecuries/${item.Constructors[0].constructorId}.png`" width="400" height="400" alt="Image de l'écurie">
              </div>
            </div>
          </div>

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
const year = ref(2024); // Variable pour l'année sélectionnée

const getUrl = (item) => {
  return new URL(`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/pilotes/` + item + `.png`, import.meta.url).href;
};

const getPoints = async () => {
  try {
    const response = await fetch(`https://ergast.com/api/f1/${year.value}/driverStandings.json`);
    const data = await response.json();
    f1.value.points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    f1.value.pointMax = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
};

const changeYear = (delta) => {
  year.value += delta;
  getPoints(); // Mettre à jour les données avec la nouvelle année
};

// Fonction pour appliquer les classes en fonction de la position
const getCardClass = (position) => {
  if (position === 1) {
    return 'bg-gold';
  } else if (position === 2) {
    return 'bg-silver';
  } else if (position === 3) {
    return 'bg-bronze';
  }
  return 'bg-zinc-200'; // Couleur par défaut pour les autres positions
};

onMounted(getPoints);
</script>

<style scoped>
.card-container {
  perspective: 1000px;
  width: 90vw;
  height: 300px;
  margin: 10px;
}

@media (min-width: 768px) {
  .card-container {
    width: 250px;
    height: 400px;
  }
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-container:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
}

.card-back {
  transform: rotateY(180deg);
  background-color: #f8f9fa;
}

/* Styles pour les différentes couleurs */
.bg-gold {
  background-color: #FFD700; /* Doré */
}

.bg-silver {
  background-color: #C0C0C0; /* Argenté */
}

.bg-bronze {
  background-color: #CD7F32; /* Bronze */
}

.bg-zinc-200 {
  background-color: #E0E0E0; /* Couleur par défaut */
}

@media (max-width: 768px) {
  .text-lg {
    font-size: 1rem;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .btn {
    font-size: 0.8rem;
  }
}
</style>
