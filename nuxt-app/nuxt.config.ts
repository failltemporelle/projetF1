// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    modules: ['@nuxtjs/tailwindcss'],

    plugins : [ "~/plugins/client.js" ],

 
    
  
    typescript: {
      typeCheck: true,
    },
  
  
  
  })
  