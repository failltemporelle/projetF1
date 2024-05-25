<template>
  <Navbar />
  <section class="grid grid-cols-4 gap-6 p-8">
    <div v-for="item in f1.race"
      :class="{'card hover:shadow-lg transition-shadow rounded-lg text-card-foreground bg-secondary': true, 'bg-red-500': isPastRace(item.date), 'bg-card': !isPastRace(item.date)}"
      data-v0-t="card">
      <div class="grid gap-2 p-4">
        <label class="text-s color-black font-bold">Date : {{ item.date }}</label>
        <div class="space-y-1 leading-none">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold">
            <p>Rang : {{ item.round }}</p>
          </label>
          <p>Circuit : {{ item.Circuit.circuitName }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400"> Localisation: {{ item.Circuit.Location.country }} {{
            item.Circuit.Location.locality }}</p>
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
          // Handle non-200 HTTP responses
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        f1.value.race = data.MRData.RaceTable.Races;
        console.log(data);
      } catch (e) {
        console.error("Failed to fetch course data", e);
      }
    };

    const isPastRace = (date) => {
      const raceDate = new Date(date);
      const currentDate = new Date();
      return raceDate < currentDate;
    };

    onMounted(getCourse);
    return { f1, isPastRace };
  },
};
</script>

<style>
/* Add any additional CSS you need */
.bg-red-500 {
  background-color: red;
}
</style>