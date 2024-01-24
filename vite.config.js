export default {
    // ...
    build: {
      rollupOptions: {
        external: ['three'], // Spécifiez que 'three' est un module externe
      },
    },
  };