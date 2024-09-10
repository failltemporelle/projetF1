<template>
  <navbar />
  <slot />
  <div class="flex justify-center items-center">
    <Pilotestat />
  </div>
  <div class="flex flex-row flex-wrap place-content-center">
    <div class="p-4 w-full md:w-auto" v-for="item in f1.points" :key="item.Driver.driverId">
      <!-- Carte avec transformation 3D pour le retournement -->
      <div class="card-container">
        <div class="card-inner">
          <!-- Face avant de la carte -->
          <div class="card-front">
            <div class="rounded-lg text-card-foreground card hover:shadow-lg transition-shadow bg-zinc-200">
              <div class="items-center text-center relative">
                <!-- Position du pilote -->
                <span class="indicator indicator-item badge font-bold m-2 text-red-800">
                  {{ item.position }}
                </span>
                <!-- Points du pilote -->
                <span class="indicator indicator-item badge font-bold bg-gray-200 text-black p-2 rounded-full">
                  {{ item.points }} Points
                </span>
              </div>

              <div class="flex flex-col space-y-1.5 p-6 items-center text-center">
                <!-- Nom du pilote -->
                <p class="card-title mb-2 text-xl md:text-2xl text-bold text-zinc-900 font-bold">{{ item.Driver.givenName }} {{ item.Driver.familyName }}</p>

                <!-- Image avec effet de zoom au survol -->
                <div class="relative">
                  <img :src="getUrl(item.Driver.driverId)" alt="Image du pilote" class="mx-auto lg:block hidden"
                    width="200" height="100">
                </div>

                <!-- Barre de progression avec points max -->
                <progress class="progress w-full md:w-50 bg-red-600" :value="item.points" :max="f1.pointMax"></progress>

                <!-- Nouveau: Affichage du nom de l'équipe -->
                <p class="text-sm text-gray-700 mt-2"><strong>Équipe:</strong> {{ item.Constructors[0].name }}</p>

                <!-- Nouveau: Affichage des victoires du pilote -->
                <p class="text-sm text-gray-700"><strong>Victoires:</strong> {{ item.wins }}</p>

                <!-- Bouton avec lien vers plus d'infos -->
                <button class="btn btn-sm mt-3">
                  <NuxtLink :to="`/pilote/${item.Driver.driverId}`">
                    <span class="text-sm font-medium hover:underline underline-offset-4 text-xs button">Informations</span>
                  </NuxtLink>
                </button>
              </div>
            </div>
          </div>

          <!-- Face arrière de la carte -->
          <div class="card-back">
            <div
              class="rounded-lg text-card-foreground card hover:shadow-lg transition-shadow bg-zinc-300 p-6 flex items-center justify-center">
              <!-- Contenu personnalisé de la face arrière -->
              <p class="text-lg text-gray-800 font-bold">Détails sur {{ item.Driver.givenName }} {{ item.Driver.familyName }}.</p>
              <p class="text-sm text-gray-600">Origine : {{ item.Driver.nationality }}</p>
              <p class="text-sm text-gray-600">Date de naissance : {{ item.Driver.dateOfBirth }}</p>
              <img
                :src="`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/ecuries/${item.Constructors[0].constructorId}.png`"
                class="mx-auto" width="200" height="300">
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
const getUrl = (item) => {
  return new URL(`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/pilotes/` + item + `.png`, import.meta.url).href;
};
const getPoints = async () => {
  try {
    const response = await fetch("https://ergast.com/api/f1/2024/driverStandings.json");
    const data = await response.json();
    f1.value.points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    f1.value.pointMax = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
};

onMounted(getPoints);
</script>

<style scoped>
.card-container {
  perspective: 1000px;
  width: 90vw; /* Prend 90% de la largeur de l'écran pour les mobiles */
  height: 300px; /* Ajuste la hauteur pour mobile */
  margin: 10px;
}

@media (min-width: 768px) {
  /* Adaptation pour les écrans plus larges (tablettes et desktop) */
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
  /* Rotation sur l'axe Y pour retourner la carte */
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  /* Cache la face arrière lorsqu'on ne la voit pas */
  border-radius: 12px;
}

.card-back {
  transform: rotateY(180deg);
  /* Face arrière est initialement retournée */
  background-color: #f8f9fa;
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
