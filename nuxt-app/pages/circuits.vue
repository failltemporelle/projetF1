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
            fetch("https://ergast.com/api/f1/2022/circuits.json")
                .then((response) => response.json())
                .then((data) => {
                    this.f1.course = data.MRData.CircuitTable.Circuits;
                    this.f1.classement = data.MRData.RaceTable.Races[0].Results;
                });
        },
    },
};





</script>