<template>
    <Navbar />
    <div v-if="f1.race.length > 0">
        <div v-for="item in f1.race" :key="item.round">
            <div class="p-6 bg-gray-900 text-white rounded-lg shadow-md">
                <div class="flex justify-between items-center mb-4">
                    <h1 class="text-2xl font-bold">Prochaine course</h1>
                    <!-- <img src="/path-to-logo.png" alt="F1 Logo" class="h-10"> -->
                </div>
                <h2 class="text-xl font-bold">{{ item.raceName }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <!-- <img src="/path-to-track.png" alt="Track Layout" class="w-full"> -->
                        <p class="mt-2">Nombre de tours : 58</p>
                        <p>Longueur du circuit : 5.303 km</p>
                        <p>Distance de la course : 307.574 km</p>
                    </div>
                    <div>
                        <div
                            class="bg-secondary text-primary-content rounded-xl card hover:shadow-lg transition-shadow p-6 m-6">
                            <h2 class="text-xl font-semibold">Programme</h2>
                            <ul class="mt-2">
                                <li>Essais 1 : {{ item.FirstPractice.date }} {{ item.FirstPractice.time }}</li>
                                <li>Essais 2 : {{ item.SecondPractice.date }} {{ item.SecondPractice.time }}</li>
                                <li>Essais 3 : {{ item.ThirdPractice.date }} {{ item.ThirdPractice.time }}</li>
                                <li>Qualifications : {{ item.Qualifying.date }} {{ item.Qualifying.time }}</li>
                                <li>Course : {{ item.date }} {{ item.time }}</li>
                            </ul>
                        </div>
                        <div
                            class="bg-secondary text-primary-content rounded-xl card hover:shadow-lg transition-shadow p-6 m-6">
                            <h3 class="text-lg font-semibold">Meilleur pilote actuel</h3>
                            <div class="flex items-center mt-2">
                                <div v-for="driver in f1.bestRacer" :key="driver.Driver.driverId">
                                    <img :src="getUrl(driver.Driver.driverId)" alt="Image du pilote"
                                        class="mx-auto lg:block hidden" width="200">
                                    <div class="ml-4">
                                        <p class="ml-2">{{ driver.Driver.givenName }} {{ driver.Driver.familyName }}</p>
                                        <p>Points : {{ driver.points }}</p>
                                        <p>Victoires : {{ driver.wins }}</p>
                                        <p>Podiums : {{ driver.podiums }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-secondary text-primary-content rounded-xl card hover:shadow-lg transition-shadow p-6 m-6 pr-9">
                        <h2 class="text-xl font-semibold">Classement actuel</h2>
                        <div class="p-4" v-for="driver in f1.points" :key="driver.Driver.driverId">
                            <ul>
                                <li class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <p class="ml-2">{{ driver.Driver.givenName }} {{ driver.Driver.familyName }}</p>
                                    </div>
                                    <p>Ferrari</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="mt-4 p-4 bg-gray-800 rounded-lg">
                    <h2 class="text-xl font-semibold">Melbourne</h2>
                    <p class="mt-2">Quand la Formule 1 est arrivée en Australie en 1985, elle s'est installée à
                        Adelaide...</p>
                </div>
                <div class="mt-4 p-4 bg-gray-800 rounded-lg flex items-center justify-between">
                    <div>
                        <h2 class="text-xl font-semibold">Météo</h2>
                        <p class="mt-2">Température : 23°C</p>
                        <p>Vent : 24 km/h</p>
                    </div>
                    <!-- <img src="/path-to-weather-icon.png" alt="Icône météo" class="h-16 w-16"> -->
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const f1 = ref({
    race: [],
    points: [],
    bestRacer: [],
    pointMax: null,
});

const fetchNextRace = async () => {
    try {
        const response = await fetch('https://ergast.com/api/f1/2024/9.json');
        const data = await response.json();
        f1.value.race = data.MRData.RaceTable.Races;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
};

const fetchPoints = async () => {
    try {
        const response = await fetch('https://ergast.com/api/f1/2024/driverStandings.json');
        const data = await response.json();
        f1.value.points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 5);
        f1.value.pointMax = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
};

const fetchBestRacer = async () => {
    try {
        const response = await fetch('https://ergast.com/api/f1/2024/driverStandings.json');
        const data = await response.json();
        f1.value.bestRacer = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 1);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
};

const getUrl = (item) => {
    return new URL(`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/pilotes/` + item + `.png`, import.meta.url).href;
};

onMounted(() => {
    fetchNextRace();
    fetchPoints();
    fetchBestRacer();
});
</script>
