<template>
    <Navbar />
    <div v-for="text in texts" :key="text.id">
    <p :class="getColorClass(text.id)">hello</p>
    </div>
    <div class="bg-purple-800 text-white rounded-xl">
        <div class="px-8">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                    <div class="text-4xl font-bold">{{ f1.pilote.permanentNumber }}</div>
                </div>
                <div class="text-right">
                    <div class="text-sm">12 - 14 July</div>
                    <div class="text-lg font-bold">Next Grand Prix</div>
                    <div class="text-2xl font-bold">Great Britain 2019</div>
                </div>
            </div>
            <div class="flex justify-between items-end mt-8">
                <div class="space-y-4">
                    <div v-if="selectedDriver">
                        <div class="text-6xl font-bold">{{ selectedDriver.Constructors[0].name }}</div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="text-8xl font-bold text-yellow-300">{{ f1.pilote.permanentNumber }}</div>
                        <div>
                            <div class="text-4xl font-bold">{{ f1.pilote.givenName }} {{ f1.pilote.familyName }}</div>
                            <div class="text-xl">{{ f1.pilote.nationality }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center mt-8">
                <div class="space-y-2">
                    <div v-if="selectedDriver">
                        <div class="text-2xl font-bold">Points: {{ selectedDriver.points }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const f1 = ref({
    pilote: {},
});

const getUrl = () => {
    var url = new URL(window.location.href);
    var urlsplit = url.pathname.split("/");
    var idpilote = urlsplit[2];
    return idpilote;
};

const getPilote = async () => {
    var idPilote = getUrl();
    try {
        const response = await fetch(`http://ergast.com/api/f1/drivers/${idPilote}.json`);
        const data = await response.json();
        f1.value.pilote = data.MRData.DriverTable.Drivers[0];
        console.log(f1.value.point);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
};

onMounted(getPilote);

import { ref, onMounted } from 'vue';

const f1Standings = ref(null);
const selectedDriver = ref(null);

const fetchDriverStandings = async () => {
    try {
        const response = await fetch("http://ergast.com/api/f1/current/driverStandings.json");
        const data = await response.json();
        f1Standings.value = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
};

const findDriver = (driverId) => {
    if (!f1Standings.value) return null;
    return f1Standings.value.find(driver => driver.Driver.driverId === driverId);
};
onMounted(async () => {
    await fetchDriverStandings();
    var idpilote = getUrl();
    selectedDriver.value = findDriver(idpilote);
    console.log(selectedDriver.value);
});



const texts = ref([
  { id: getUrl(), content: "Texte 1" },
]);

const getColorClass = (id) => {
  switch (id) {
    case 'hamilton':
      return 'red-text';
    default:
      return '';
  }
};
</script>


<style>

.red-text {
  color: red;
}

</style>

