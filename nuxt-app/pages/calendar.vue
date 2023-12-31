<template>
    <Navbar />

    <div v-for="item in this.f1.race" class="p-6">
     <p>{{ item.date }}</p>
     <p>{{ item.round }}</p>
     <p>{{ item.Circuit.circuitName }}</p>
     <p>{{ item.Circuit.Location.country }} {{ item.Circuit.Location.locality }}</p>
     <br>
    
    
    </div>
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
        const response = await fetch("http://ergast.com/api/f1/2024.json");
        if (!response.ok) {
          // Gère les réponses HTTP non-200
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        f1.value.race = data.MRData.RaceTable.Races;
        // f1.value.course =     data.MRData.RaceTable.Races;
        // f1.value.classement = data.MRData.RaceTable.Races[0].Results;
        // f1.value.pilote =     data.MRData.RaceTable.Races[0].Results[0].Driver;
        // console.log(f1.value.classement);
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