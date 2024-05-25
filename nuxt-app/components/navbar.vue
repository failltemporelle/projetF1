<template>
  <div class="navbar bg-base-100 sticky top-0 z-50">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>
              <NuxtLink to="/Stats" class="text-sm font-medium hover:underline underline-offset-4">Stats</NuxtLink>
            </a></li>
          <li>
            <a>Informations</a>
            <ul class="p-2">
              <li><a>
                  <NuxtLink to="/pilotes" class="text-sm font-medium hover:underline underline-offset-4">Pilotes
                  </NuxtLink>
                </a></li>
              <li><a>
                  <NuxtLink to="/ecurie" class="text-sm font-medium hover:underline underline-offset-4">Ecuries</NuxtLink>
                </a></li>
            </ul>
          </li>
          <li>
            <a>Course</a>
            <ul class="p-2">
              <li><a>
                  <NuxtLink to="/course" class="text-sm font-medium hover:underline underline-offset-4">Dernière Courses
                  </NuxtLink>
                </a></li>
              <li><a>
                  <NuxtLink to="/calendar" class="text-sm font-medium hover:underline underline-offset-4">Calendrier
                  </NuxtLink>
                </a></li>
            </ul>
          </li>
        </ul>
      </div>
      <NuxtLink to="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" x2="4" y1="22" y2="15"></line>
        </svg></NuxtLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a>
            <NuxtLink to="/Stats" class="text-sm font-medium hover:underline underline-offset-4">Stats</NuxtLink>
          </a></li>
        <li>
          <details>
            <summary>Informations</summary>
            <ul class="p-2">
              <li><a>
                  <NuxtLink to="/pilotes" class="text-sm font-medium hover:underline underline-offset-4">Pilotes
                  </NuxtLink>
                </a></li>
              <li><a>
                  <NuxtLink to="/ecurie" class="text-sm font-medium hover:underline underline-offset-4">Ecuries</NuxtLink>
                </a></li>
            </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Courses</summary>
          <ul class="p-2">
            <li><a>
                <NuxtLink to="/calendar" class="text-sm font-medium hover:underline underline-offset-4">Calendrier
                </NuxtLink>
              </a></li>
            <li><a>
                <NuxtLink to="/course" class="text-sm font-medium hover:underline underline-offset-4">Dernière Courses
                </NuxtLink>
              </a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
  <div class="navbar-end">
    <a class="btn">
      <NuxtLink to="/SignUp" class="text-sm font-medium hover:underline underline-offset-4">S'inscrire</NuxtLink>
    </a>
  </div>
</div></template>
