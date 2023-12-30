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
        <p class="text-sm/relaxed">Location: {{ item.raceName }}</p>
        <div v-for="item in this.f1.first">
        <p class="text-4xl tracking-widest">Winner: Lewis Hamilton {{ item.givenName  }}</p>
    </div>
      </div>
    </div>
  </section>
  <section class="grid grid-cols-3 gap-4">

    <div v-for="item in this.f1.classement"  class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div class="grid gap-2 p-4">
        <label class="text-sm color-black">{{ item.Driver.givenName }} {{ item.Driver.familyName }}</label>
        <div class="space-y-1 leading-none">
          <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {{ item.Constructor.name }}
          </label>
          <p class="text-sm text-gray-500 dark:text-gray-400">Start: {{item.grid}}, Finish: {{ item.position }} Status : {{ item.status }} </p>
        </div>
      </div>
    </div>

  </section>
</main>



    <div class="flex flex-row flex-wrap place-content-center">
        <div v-for="item in this.f1.course" class="card w-60 bg-red-700 shadow-xl ml-6 mt-6">
            <div class="card-body">
                <p> {{ item.raceName }}</p>
                <p> {{ item.date }}</p>
                <p> {{ item.round }}</p>
                <p> {{ item.season }}</p>
            </div>
        </div>
    </div>


    <div class="flex flex-row flex-wrap place-content-center">
        <div v-for="item in this.f1.classement" class="card w-60 bg-red-700 shadow-xl ml-6 mt-6">
            <span class="indicator-item badge badge-primary text-teal-50 content-end"> Arrivé : {{ item.position }} Départ : {{item.grid}} </span>
            <div class="card-body">
                <p> {{ item.Constructor.name }}</p>
                <p class="font-bold"> {{ item.Driver.givenName }} {{ item.Driver.familyName }}</p>
                <p> {{ item.status }}</p> 
                <!-- <p> tour : {{item.FastestLap[0].lap}} </p>
                <p> tour : {{ item.FastestLap.lap }}</p> -->
                <!-- <p> Rank : {{ item.FastestLap.rank }}</p>
                <p> Time : {{ item.FastestLap.Time.time }}</p>
                <p> Average Speed : {{ item.FastestLap.AverageSpeed.speed }} {{item.FastestLap.AverageSpeed.units}}</p> -->

            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const f1 = ref({
      course: [],
      classement: [],
      first: null,
    });

    const getCourse = async () => {
      try {
        const response = await fetch("https://ergast.com/api/f1/current/last/results.json");
        if (!response.ok) {
          // Gère les réponses HTTP non-200
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        f1.value.course = data.MRData.RaceTable.Races;
        f1.value.classement = data.MRData.RaceTable.Races[0].Results;
        f1.value.first = data.MRData.RaceTable.Races[0].Results[0].Driver;
        // Logs pour déboguer
        console.log(f1.value.classement);
        console.log(f1.value.course);
        console.log(f1.value.first);
      } catch (e) {
        console.error("Failed to fetch course data", e);
      }
    };

    onMounted(getCourse);

    return { f1 };
  },
};

</script>



