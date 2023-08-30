<template data-theme="cupcake">
  <navbar />
  <div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold text-white">Hello</h1>
      <p class="py-6 text-white">Toutes les informations sur la saison de F1 actuelle</p>
      <button class="btn btn-primary mr-4">Créer un compte</button>
      <button class="btn btn-secondary">Se connecter</button>
      
    </div>
  </div> 
</div>
</template>

<script>
import { NuxtLink } from '~~/.nuxt/components';

var script = document.createElement('script'); script.dataset.cache = true; script.dataset.websiteId = '6dc26c0f-0d76-46f8-8bb2-14e706229e91'; script.src='https://s.abla.io/abla.js'; document.getElementsByTagName('head')[0].appendChild(script);

export default {
    methods: {
        goPilotesPage() {
            window.location.href = "https://projet-f1.vercel.app/pilotes";
        },
    },
    components: { NuxtLink }
}
</script>
<style>

.hero {
  background-color: #ff0000;
  background-image: linear-gradient(90deg,  #ff0000 0%, #000000 100%);
}
</style>

