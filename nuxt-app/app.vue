<!-- <template>
    <bar />
    <div>
        <button http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" class="btn " @click="getpoints()">Points des pilotes</button>
        <br>
        <button http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" class="btn" @click="getpointE()">Points des écuries</button>

    </div>
    <div>
        <div class="flex flex-row flex-wrap place-content-center">
            <div v-for="item in this.f1.points" class="card w-96 bg-base-100 shadow-xl ml-6 mt-6">
                <div class="card-body">
                    <p class="font-bold">{{ item.Driver.givenName }} {{ item.Driver.familyName }}</p>
                    <p>{{ item.points }} Points</p>
                    <p> Position au classement : {{ item.position }}</p>
                </div>
            </div>
        </div>
    </div>

    <div>
        <div class="flex flex-row flex-wrap place-content-center">
            <div v-for="item in this.f1.ecuries" class="card w-96 bg-base-100 shadow-xl ml-6 mt-6">
                <div class="card-body">
                    <p class="font-bold">{{ item.Constructor.name }}</p>
                    <p> Points: {{ item.points }}</p>
                    <p> Position au classement: {{ item.position }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default ({
    data() {
        return {
            f1: {
                driver: [],
                points: [],
                ecuries: [],
            },
        }
    },
    methods: {
        getpoints() {
            this.f1.ecuries = [];
            fetch('https://ergast.com/api/f1/2022/driverStandings.json')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.f1.points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                    console.log(this.f1.points);

                })
        },



        getpointE() {
            this.f1.points = [];
            fetch('https://ergast.com/api/f1/2022/constructorStandings.json')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.f1.ecuries = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                    console.log(this.f1.ecuries);
                   
                })
        },
    }
})
</script> -->

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
