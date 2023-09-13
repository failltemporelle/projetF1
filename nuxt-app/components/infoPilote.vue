<template>
    
</template>




<script setup lang="ts">

onMounted(() => {
    getpilote()
})

var getpilote = () =>{
    fetch('https://ergast.com/api/f1/2023/driverStandings.json', 
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}



</script>