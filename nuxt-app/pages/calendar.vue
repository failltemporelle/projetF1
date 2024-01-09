<template>
    <Navbar />
    <section class="grid grid-cols-3 gap-4 p-6">
    <div v-for="item in this.f1.race"  class="card hover:shadow-lg transition-shadow rounded-lg bg-card text-card-foreground bg-secondary" data-v0-t="card">
      <div class="grid gap-2 p-4">
        <label class="text-s color-black font-bold">Date : {{ item.date }}</label>
        <div class="space-y-1 leading-none">
          <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold">
            <p>Rang : {{ item.round }}</p>
          </label>
          <p>Circuit : {{ item.Circuit.circuitName }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400"> Localisation: {{ item.Circuit.Location.country }} {{ item.Circuit.Location.locality }}</p>
        </div>
      </div>
    </div>
  </section>
    <Footer />
</template>




<script>

import { ref, onMounted } from 'vue';

export default {
  setup() {
    const f1 = ref({
        race: [],
    });

    const getCourse = async () => {
      try {
        const response = await fetch("https://ergast.com/api/f1/2024.json");
        if (!response.ok) {
          // Gère les réponses HTTP non-200
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        f1.value.race = data.MRData.RaceTable.Races;
        console.log(data);

      } catch (e) {
        console.error("Failed to fetch course data", e);
      }
    };

    onMounted(getCourse);

    return { f1 };
  },
};
</script>

<style> .card {
  /* background-color: #f0f2ce;
background-image: linear-gradient(0deg, #f0f2ce 0%, #c4e4ce 100%); */
  background-color: #e4d8b4;
  background-image: linear-gradient(0deg, #e4d8b4 0%, #c4e4ce 100%);



}
</style>