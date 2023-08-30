<template>
    <Navbar />
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">Création de compte</h1>
                <p class="py-6">Bienvenue sur race net vous pouvez retrouver toutes les informations sur la saions de f1</p>
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
                        <button class="btn btn-wide" @click="createAccount()">test</button>
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
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2d3ZycnhzaGZlaWpjcWVxZ2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5OTcxMTksImV4cCI6MjAwODU3MzExOX0.k-5YYvJo4FbAw9CQxmbCE8ZpDw54qY1sVXWbY0j4g_8';

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

        location.href = '/';

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
