<template>
  <header class="px-4 lg:px-6 h-14 flex items-center">
    <NuxtLink to="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
      <line x1="4" x2="4" y1="22" y2="15"></line>
    </svg></NuxtLink>
    <span class="sr-only">Formula 1</span>
  <nav class="ml-auto flex gap-4 sm:gap-6">
    <NuxtLink to="/pilotes" class="text-sm font-medium hover:underline underline-offset-4">Pilotes</NuxtLink>
    <NuxtLink to="/ecurie" class="text-sm font-medium hover:underline underline-offset-4">Ecuries</NuxtLink>
    <NuxtLink to="/course" class="text-sm font-medium hover:underline underline-offset-4">Dernière Courses</NuxtLink>
    <NuxtLink to="/calendar" class="text-sm font-medium hover:underline underline-offset-4">Calendrier</NuxtLink>
    <NuxtLink to="/SignUp" class="text-sm font-medium hover:underline underline-offset-4">S'inscrire</NuxtLink>
  </nav>
</header>
</template>
