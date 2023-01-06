<template data-theme="cupcake">
  <navbar />

<div class="hero min-h-screen" style="background-image: url(https://cdn.motorsportmagazine.com/wp-content/uploads/2020/08/19104118/McLaren-Ferrari-red-Bull-and-Mercedes-cars-lined-up-in-parc-ferme-after-the-2020-F1-Spanish-Grand-Prix.jpg);">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold"></h1>
      <p class="mb-5">Toutes les informations sur la saison de f1 en cours</p>
      <button class="btn btn-succes" @click="goPilotesPage()">Pilotes</button>
      
    </div>
  </div>
</div>
</template>

<script>
export default {
  methods : {

    goPilotesPage() {
      window.location.href = "https://projet-f1.vercel.app/pilotes"
    },
  }
}
</script>

