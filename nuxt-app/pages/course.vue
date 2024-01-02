<template>
    <navbar />

<main class="p-6">
  <section v-for="item in this.f1.course" class="mb-6">
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="text-2xl font-semibold leading-none tracking-tight">F1 Race</h3>
        <p class="text-sm text-muted-foreground">Date: {{ item.date }}</p>
      </div>
      <div class="p-6 grid gap-4 border-y py-4">
        <p class="text-sm/relaxed">Localisation: {{ item.raceName }}</p>
        <p class="text-4xl tracking-widest">Gagnant: {{f1.pilote.givenName}} {{ f1.pilote.familyName }}</p>
      </div>
    </div>
  </section>
  <section class="grid grid-cols-3 gap-4">
    <div v-for="item in this.f1.classement"  class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div class="grid gap-2 p-4">
        <label class="text-s color-black font-bold">{{ item.Driver.givenName }} {{ item.Driver.familyName }}</label>
        <div class="space-y-1 leading-none">
          <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold">
            {{ item.Constructor.name }}
          </label>
          <p> Tour : {{item.FastestLap.AverageSpeed.speed}} {{item.FastestLap.AverageSpeed.units}}  </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Start: {{item.grid}}, Finish: {{ item.position }} Status : {{ item.status }} </p>
        </div>
      </div>
    </div>
  </section>
</main>
<Footer />
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const f1 = ref({
      course: [],
      classement: [],
      first: null,
      pilote: {},
    });

    const getCourse = async () => {
      try {
        const response = await fetch("https://ergast.com/api/f1/current/last/results.json");
        if (!response.ok) {
          // Gère les réponses HTTP non-200
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        f1.value.course =     data.MRData.RaceTable.Races;
        f1.value.classement = data.MRData.RaceTable.Races[0].Results;
        f1.value.pilote =     data.MRData.RaceTable.Races[0].Results[0].Driver;
        // Logs pour déboguer
        console.log(f1.value.classement);

      } catch (e) {
        console.error("Failed to fetch course data", e);
      }
    };

    onMounted(getCourse);

    return { f1 };
  },
};

</script>



