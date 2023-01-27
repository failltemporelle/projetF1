<template>
<Navbar />
<div class="flex flex-row flex-wrap place-content-center">
        <div v-for="item in this.f1.course" class="card w-60 bg-red-700 shadow-xl ml-6 mt-6">
            <div class="card-body">
                <p> {{ item.circuitName }}</p>
                <p> {{item.Location.locality}}</p>
                <p> {{item.Location.country}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { Analytics } from '@vercel/analytics/react';
export default {
    created() {
        this.getCircuit();
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
        getCircuit() {
            this.f1.course = [];
            fetch("https://ergast.com/api/f1/2023/circuits.json")
                .then((response) => response.json())
                .then((data) => {
                    this.f1.course = data.MRData.CircuitTable.Circuits;
                    this.f1.classement = data.MRData.RaceTable.Races[0].Results;
                });
        },
    },
};

</script>

<style>
.card {
background-color: #FF3CAC;
background-image: -webkit-linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
background-image: -moz-linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
background-image: -o-linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);

}

</style>