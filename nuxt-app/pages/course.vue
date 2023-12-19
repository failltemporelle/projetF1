<template>
    <navbar />

    <SpeedInsights/>

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
import { SpeedInsights } from "@vercel/speed-insights/next"

var script = document.createElement('script'); script.dataset.cache = true; script.dataset.websiteId = '6dc26c0f-0d76-46f8-8bb2-14e706229e91'; script.src='https://s.abla.io/abla.js'; document.getElementsByTagName('head')[0].appendChild(script);

export default {
    created() {
        this.getCourse();
    },
    data() {
        return {
            f1: {
                course: [],
                classement: [],
                temps: [],
            },
        };
    },

    methods: {
        getCourse() {
            this.f1.course = [];
            fetch("https://ergast.com/api/f1/current/last/results.json")
                .then((response) => response.json())
                .then((data) => {
                    this.f1.course = data.MRData.RaceTable.Races;
                    this.f1.classement = data.MRData.RaceTable.Races[0].Results;
                    console.log(this.f1.classement);
                });
        },
    },
};
</script>


