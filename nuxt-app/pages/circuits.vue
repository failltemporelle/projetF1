<template>
    <Navbar />
    <div class="flex flex-row flex-wrap place-content-center">
    <div v-for="item in this.f1.course" class="card w-60 bg-red-700 shadow-xl ml-6 mt-6 ">
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img :src="`https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/assets/circuit/${item.circuitId}.png`"
                    class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
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