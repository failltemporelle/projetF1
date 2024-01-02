<template>
    <Navbar />
    <div class="bg-secondary text-primary-content rounded-xl">
        <div class="flex justify-between items-center px-8 py-4">
            <div class="space-y-2">
                <div class="text-9xl font-bold opacity-10 text-primary-content">{{ f1.pilote.permanentNumber }}</div>
                <div class="flex space-x-4">
                    <div>
                        <div v-if="selectedDriver">
                        <div class="text-sm">Points</div>
                        <div class="text-3xl font-bold primary-content">{{ selectedDriver.points }}</div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-end">
                <div class="text-sm">12/12/2023</div>
                <div class="text-2xl font-bold">Next Gran Prix</div>
                <div class="text-2xl font-bold">Chine</div>
        </div>
    </div>
    <div class="flex items-center justify-between px-8 py-4">
        <div class="flex flex-col">
            <div v-if="selectedDriver">
            <h1 class="text-6xl font-bold">{{ selectedDriver.Constructors[0].name }}</h1>
        </div>
            <div class="flex items-center space-x-2">
                <div class="text-6xl font-bold text-red-600">{{ f1.pilote.permanentNumber }}</div>
                <div>
                    <h2 class="text-4xl font-bold">{{ f1.pilote.givenName }} {{ f1.pilote.familyName }}</h2>
                    <p>{{ f1.pilote.nationality }}</p>
                </div>
            </div>
        </div>
        <div class="rounded-xl bg-primary"><img :src="getUrl2(f1.pilote.driverId)" width="400">
        </div>
    </div>
</div>
<Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const f1Standings = ref(null);
const selectedDriver = ref(null);

const f1 = ref({
    pilote: {},
    course: [],
});

const getUrl2 = (item) => {
    console.log(item);
  return new URL(`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/pilotes/` + item + `.png`, import.meta.url).href;
};

const getUrl = () => {
    var url = new URL(window.location.href);
    var urlsplit = url.pathname.split("/");
    var idpilote = urlsplit[2];
    return idpilote;
};

const getPilote = async () => {
    var idPilote = getUrl();
    try {
        const response = await fetch(`https://ergast.com/api/f1/drivers/${idPilote}.json`);
        const data = await response.json();
        f1.value.pilote = data.MRData.DriverTable.Drivers[0];
        console.log(f1.value.pilote);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
};

const fetchDriverStandings = async () => {
    try {
        const response = await fetch(`https://ergast.com/api/f1/current/driverStandings.json`);
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

onMounted(getUrl2);
onMounted(getPilote);
onMounted(async () => {
    await fetchDriverStandings();
    var idpilote = getUrl();
    selectedDriver.value = findDriver(idpilote);
});

</script>

