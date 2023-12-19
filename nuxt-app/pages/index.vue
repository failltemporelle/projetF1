<template>
    <SpeedInsights/>

  <Navbar />
  <main class="flex-1">
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
  </main>
</template>

<script setup>
import { SpeedInsights } from "@vercel/speed-insights/next"

</script>