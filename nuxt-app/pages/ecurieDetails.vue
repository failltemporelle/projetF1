<template>
    <Navbar />
    <div class="bg-secondary text-primary-content rounded-xl card hover:shadow-lg transition-shadow p-6 m-6">
        <div class="flex justify-between items-center px-8 py-4">
            <div class="space-y-2">
            </div>
    </div>
    <div class="flex items-center justify-between px-8 py-4">
        <div class="flex flex-col">
            <div class="flex items-center space-x-2">
                <div class="text-6xl font-bold text-red-600">{{ f1.ecurie.name }}</div>
                <div>
                    <h2 class="text-4xl font-bold">{{ f1.ecurie.nationality }}</h2>
                </div>
            </div>
        </div>
        <div class="rounded-xl bg-primary card hover:shadow-lg transition-shadow"><img :src="getUrl2(f1.ecurie.constructorId)" width="400">
        </div>
    </div>
    
</div>
<div class="bg-secondary text-primary-content rounded-xl card hover:shadow-lg transition-shadow p-6 m-6">
    <ThreeModel/>
  </div>
<Footer />
</template>

<script setup>

import { ref, onMounted, watch } from 'vue';



const f1Standings = ref(null);
const selectedDriver = ref(null);



const f1 = ref({
    ecurie: {},
    course: [],
});

const getUrl2 = (item) => {
  return new URL(`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/ecuries/` + item + `.png`, import.meta.url).href;
};

const getUrl = () => {
    var url = new URL(window.location.href);
    var urlsplit = url.pathname.split("/");
    var idecurie = urlsplit[2];
    return idecurie;
};
const getPilote = async () => {
    var idEcurie = getUrl();
    try {
        const response = await fetch(`http://ergast.com/api/f1/constructors/${idEcurie}.json`);
        const data = await response.json();
        f1.value.ecurie = data.MRData.ConstructorTable.Constructors[0];
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
};
onMounted(getUrl2);
onMounted(getPilote);

</script>

 