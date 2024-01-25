<template>
    <div ref="threeContainer" class="three-container pr-11"></div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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
    scene.background = new THREE.Color("rgb(228, 216, 190)");

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainer.value.appendChild(renderer.domElement);

    // Lumière ambiante
    const ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    // Ajout d'une lumière pointue pour plus de luminosité
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Contrôles de la caméra
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Chargeur de modèle GLTF
    const loader = new GLTFLoader();
    const gltfUrl = 'https://raw.githubusercontent.com/failltemporelle/projetF1/main/nuxt-app/static/scene.gltf'
    renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight);


    loader.load(gltfUrl, (gltf) => {
        scene.add(gltf.scene);
        animate();
    });
}

function animate() {
    frameId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    const width = threeContainer.value.clientWidth;
    const height = threeContainer.value.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}
</script>

<style>
.three-container {
    width: 900px; /* Nouvelle largeur */
    height: 600px; /* Nouvelle hauteur */
}

</style>
