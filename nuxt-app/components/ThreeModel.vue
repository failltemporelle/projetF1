<template>
    <div ref="threeContainer" class="three-container"></div>
</template>
  
<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted, onUnmounted, ref } from 'vue';

let threeContainer = ref(null);
let renderer, scene, camera, frameId, controls;

onMounted(() => {
    initThreeJS();
    window.addEventListener('resize', onWindowResize);
});

onUnmounted(() => {
    if (renderer) {
        threeContainer.value.removeChild(renderer.domElement);
    }
    window.removeEventListener('resize', onWindowResize);
    cancelAnimationFrame(frameId);
});

function initThreeJS() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainer.value.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0x999999); // lumière douce
    scene.add(light);

    // Contrôles de la caméra
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Chargeur de modèle GLTF
    const loader = new GLTFLoader();
    const gltfUrl = '/_nuxt/static/scene.gltf';

    loader.load(gltfUrl, (gltf) => {
        scene.add(gltf.scene);
        animate();
    });
}

function animate() {
    frameId = requestAnimationFrame(animate);
    controls.update(); // Ajouté pour les contrôles de caméra
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.update();
}
</script>
  
<style>
.three-container {
    width: 100%;
    height: 100vh;
}
</style>
  