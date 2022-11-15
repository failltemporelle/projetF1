<template>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a @click="goHomePage">Home</a></li>
            <li><a @click="goPilotesPage()">Pilotes</a></li>
            <li><a @click="goEcuriePage()">Ecuries</a></li>
            <div v-for="item in this.f1.course">
            <li><a @click="course()">Courses : {{ item.raceName }}</a></li>
            <li> <a @click="goCircuits()"> Circuits</a></li>
          </div>
           
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost normal-case text-xl" @click="goHomePage()">Formula one</a>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
        <button class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span class="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
    </template>
    
    
    <script>
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
    
    