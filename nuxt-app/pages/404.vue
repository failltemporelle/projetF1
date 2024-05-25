<template>
    <div class="flex flex-col min-h-screen bg-[#ffffff]">
        <header class="px-4 lg:px-6 h-14 flex items-center">
            <a class="flex items-center justify-center" href="#">
                <span class="sr-only">Formula 1</span>
            </a>
            <button class="btn btn-error">
                <NuxtLink to="/">Accueil
                </NuxtLink>
            </button>
        </header>
        <main class="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-extrabold text-gray-900 dark:text-gray-100">404</h1>
            <p class="mt-2 text-lg text-gray-500 dark:text-gray-400">
                Sorry, we couldn't find the page you're looking for. Please check the URL and try again.
            </p>
            <button class="btn btn-error">
                <NuxtLink to="/">Accueil
                </NuxtLink>
            </button>
        </main>
    </div>
</template>