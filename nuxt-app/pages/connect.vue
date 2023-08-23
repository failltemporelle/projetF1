<template>
    <Navbar />
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">Login now!</h1>
                <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                    exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input v-model="email" type="email" placeholder="email" class="input input-bordered" />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text password">Password</span>
                        </label>
                        <input v-model="password" type="password" placeholder="password" class="input input-bordered" />
                    </div>
                    <div class="form-control mt-6">
                        <button class="">create account</button>
                        <button @click="createAccount()">test</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const email = ref("");
const password = ref("");

const createAccount = async () => {
    const apiUrl = 'https://kvwvrrxshfeijcqeqgjr.supabase.co/auth/v1/signup';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2d3ZycnhzaGZlaWpjcWVxZ2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNjUzNjYsImV4cCI6MjAwNzg0MTM2Nn0.4y3C0f0mmvZGUTUL9gY-VV5T-w7rKKHgnzgMIQlXTY0';

    const headers = {
        'Content-Type': 'application/json',
        'apiKey': apiKey,
    };

    const body = {
        email: email.value,
        password: password.value,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};
</script>
