<template data-theme="cupcake">
  <navbar />
  <div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold text-white">Hello there</h1>
      <p class="py-6 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <nuxt-link to="/pilotes" class="btn btn-primary">Pilotes</nuxt-link>
      <nuxt-link to="/connect" class="btn btn-primary">Calendrier</nuxt-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  
  methods: {

    goPilotesPage() {
      window.location.href = "https://projet-f1.vercel.app/pilotes"
    },
  }
}
</script>
<style>

head, html, .hero {
  background-color: #ff0000;
  background-image: linear-gradient(90deg,  #ff0000 0%, #000000 100%);
}
</style>

