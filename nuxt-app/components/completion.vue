<template>
    <div class="bg-green-100 text-black rounded-xl p-6 max-w-md mx-auto hover:shadow-lg">
      <div v-if="loading" class="text-lg">Chargement...</div>
      <div v-else-if="error" class="text-lg">{{ error }}</div>
      <div v-else>
        <div class="text-4xl font-bold text-red-500">{{ completionPercentage.toFixed(0) }}%</div>
        <div class="text-lg mb-4 ">{{ completedRaces }}/{{ totalRaces }} Grand Prix terminé</div>
        
        <div class="flex space-x-1 mb-4 radius-xl">
          <div v-for="(race, index) in totalRaces" :key="index" class="h-2 flex-1" 
               :class="index < completedRaces ? 'bg-red-500' : 'bg-gray-700'"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const loading = ref(true);
  const error = ref(null);
  const completionPercentage = ref(0);
  const completedRaces = ref(0);
  const totalRaces = ref(0);
  const lapsCompleted = ref(0);  // Mettre à jour dynamiquement
  const distanceCovered = ref(0);  // Mettre à jour dynamiquement
  
  async function fetchRaceData() {
    try {
      // Récupérer le calendrier complet de la saison actuelle
      const response = await fetch('https://ergast.com/api/f1/current.json');
      const data = await response.json();
  
      const races = data.MRData.RaceTable.Races;
      totalRaces.value = races.length;
      const today = new Date();
  
      // Compter le nombre de courses déjà effectuées
      const completed = races.filter(race => new Date(race.date) < today).length;
      completedRaces.value = completed;
  
      // Calculer le pourcentage de complétion
      completionPercentage.value = (completed / totalRaces.value) * 100;
  
      // Mettre à jour les tours et la distance basés sur les données disponibles (hypothétiques)
      const laps = completed * 57;  // Supposons 57 tours par course
      const distance = completed * 305.35;  // Supposons 305.35 km par course
      lapsCompleted.value = laps;
      distanceCovered.value = distance;
    } catch (err) {
      console.error('Erreur lors de la récupération des données de la saison F1:', err);
      error.value = 'Impossible de récupérer les données de la saison F1.';
    } finally {
      loading.value = false;
    }
  }
  
  onMounted(fetchRaceData);
  </script>
  
  <style scoped>
  .card {
    max-width: 20rem; /* Réduit la largeur maximale de la carte */
  }
  </style>
  