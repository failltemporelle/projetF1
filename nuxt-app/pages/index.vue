<template>
  <Navbar />
  <!-- <main class="flex-1">
    <section class="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
      <div class="container px-4 md:px-6">
        <div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div class="flex flex-col justify-center space-y-4">
            <div class="space-y-2">
              <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Welcome to Formula 1</h1>
              <p class="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Experience the thrill of the world's fastest sport.
              </p>
            </div>
            <div class="flex flex-col gap-2 min-[400px]:flex-row">
              <a class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main> -->


<main class="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
  <div
    class="rounded-lg border bg-card text-card-foreground shadow-sm w-80 space-y-8 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 dark:from-gray-900 dark:to-gray-900"
    data-v0-t="card"
  >
    <div class="flex flex-col space-y-1.5 p-6">
      <h1 class="text-3xl font-bold text-center text-white">Login</h1>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            for="email"
          >
            Email
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="email"
            placeholder="m@example.com"
            required=""
            type="email"
          />
        </div>
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            for="password"
          >
            Password
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="password"
            required=""
            type="password"
          />
        </div>
        <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-red-500 text-white"
          type="submit"
        >
          Login
        </button>
      </div>
      <div class="text-center mt-4">
        <p class="text-white">Don't have an account?</p>
        <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full bg-black text-white mt-2">
          Sign Up
        </button>
      </div>
    </div>
  </div>
</main>
</template>

<script setup>
</script>