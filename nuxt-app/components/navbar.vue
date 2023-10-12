<template>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><NuxtLink to='/'>Home</NuxtLink></li>
            <li><NuxtLink to='/pilotes'>Pilotes</NuxtLink></li>
            <li><NuxtLink to='/ecurie'>Ecuries</NuxtLink></li>
            <div v-for="item in this.f1.course">
              <li><NuxtLink to='/course'>Course : {{ item.raceName }}</NuxtLink></li>
              <li><NuxtLink to='/circuits'>Circuits</NuxtLink></li>
          </div>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost normal-case text-xl" @click="goHomePage()">Formula one</a>
      </div>
    </div>
    <slot />
    </template>
    
    
    <script>
  var script = document.createElement('script'); script.dataset.cache = true; script.dataset.websiteId = '6dc26c0f-0d76-46f8-8bb2-14e706229e91'; script.src='https://s.abla.io/abla.js'; document.getElementsByTagName('head')[0].appendChild(script);

    export default {
    
    
      created() {
            this.getCourse();
        },
        data() {
            return {
                f1: {
                    course: [],
                },
            };
        },
      methods : {
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
    
        goPilotesPage() {
          window.location.href = "https://projet-f1.vercel.app/pilotes"
        },
    
        goEcuriePage() {
          window.location.href = "https://projet-f1.vercel.app/ecurie"
        },
    
        course() {
          window.location.href = "https://projet-f1.vercel.app/course"
        },
    
        goHomePage() {
          window.location.href = "https://projet-f1.vercel.app/"
        },
    
        goCircuits() {
          window.location.href = "https://projet-f1.vercel.app/circuits"
        }
    
      }
    }
    
    </script>
    
    