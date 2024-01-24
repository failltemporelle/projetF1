export default {
    build: {
    rollupOptions: {
      external: ['three'], // Spécifiez que 'three' est un module externe
    },
  },
  optimizeDeps: {
    include: ['three', 'three/examples/jsm/loaders/GLTFLoader', 'three/examples/jsm/controls/OrbitControls']
  },
};