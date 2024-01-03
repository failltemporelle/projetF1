<template>
  <Navbar />
  <main class="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8 dark:bg-gray-900">
    <div class="w-full max-w-md">
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="font-semibold tracking-tight text-2xl text-center">Login</h3>
          <p class="text-sm text-muted-foreground text-center">
            Enter your email and password to login to your account.
          </p>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="email">
              Email
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email" v-model="email" type="email" placeholder="email" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="password">
              Password
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              v-model="password" type="password" placeholder="password" />
          </div>
        </div>
        <div class="flex items-center p-6">
          <button @click="createAccount()"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
            Sign in
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const email = ref("");
const password = ref("");

const createAccount = async () => {
  const apiUrl = 'https://ogfqpqjbfbpjsvomvzws.supabase.co/auth/v1/signup';
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZnFwcWpiZmJwanN2b212endzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMTc0NDcsImV4cCI6MjAxOTg5MzQ0N30.qL-eDahzsf8atWw-MW9alH-g2v4oLyVBANkeUOpQEOs';
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

    // Afficher une alerte si le compte est créé avec succès
    alert('Compte créé avec succès! Veuillez vérifier votre email pour confirmer.');

  } catch (error) {
    console.error(error);
    // Tu peux aussi informer l'utilisateur en cas d'échec
    alert("Erreur lors de la création du compte:");
  }
};
</script>







<!-- <script>
// Importer la bibliothèque Supabase
import { createClient } from '@supabase/supabase-js'

// Tes clés Supabase
const supabaseUrl = 'https://ogfqpqjbfbpjsvomvzws.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZnFwcWpiZmJwanN2b212endzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMTc0NDcsImV4cCI6MjAxOTg5MzQ0N30.qL-eDahzsf8atWw-MW9alH-g2v4oLyVBANkeUOpQEOs'
const supabase = createClient(supabaseUrl, supabaseKey)

// Fonction asynchrone pour s'inscrire
async function signUp(email, password) {
  // Utiliser Supabase pour créer un compte
  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  // Gérer la réponse
  if (error) {
    console.log('Erreur lors de la création du compte:', error)
  } else {
    console.log('Compte créé avec succès', user)
  }
}

// Appeler la fonction signUp avec tes informations
signUp('tonemail@example.com', 'tonMotDePasse')
</script> -->
  