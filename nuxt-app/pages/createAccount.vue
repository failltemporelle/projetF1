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
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text password">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="password" class="input input-bordered" />
                    </div>
                    <div class="flex flex-row flex-wrap place-content-center">
                        <button class="btn btn-wide mt-2 bg-red-700 border-none text-white font-bold" @click="createAccount()">Créer mon compte</button>
                        <button class="btn btn-wide btn-primary mt-2 bg-red-700 border-none text-white font-bold">Annuler</button>
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

onMounted(() => {
    authenticateUser(EMAIL, PASSWORD);
});

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
        alert('votre compte est bien crée')
        location.href = '/';

        if (!response.ok) {
            alert('votre compte n\'est pas crée');
            throw new Error('Failed to create user');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};



// Remplacez ces valeurs par les vôtres
const apiUrl = 'https://kvwvrrxshfeijcqeqgjr.supabase.co';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2d3ZycnhzaGZlaWpjcWVxZ2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5OTcxMTksImV4cCI6MjAwODU3MzExOX0.k-5YYvJo4FbAw9CQxmbCE8ZpDw54qY1sVXWbY0j4g_8';

const EMAIL = 'test@test.com';
const PASSWORD = '123';

async function authenticateUser(email:string, password:string) {
  try {
    const response = await fetch(`${apiUrl}/auth/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    if (response.status === 200) {
      const { access_token, refresh_token } = responseData;
      console.log('Authentification réussie.');
      console.log('Access Token:', access_token);
      console.log('Refresh Token:', refresh_token);
    } else {
      console.error(`Erreur d'authentification : ${responseData.error.message}`);
    }
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
}

authenticateUser(EMAIL, PASSWORD);




</script>
