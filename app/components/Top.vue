<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Admin Only</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-black">Email address</label>
          <div class="mt-2">
            <input type="email" name="email" id="email" autocomplete="email" required="" class="border border-indigo-100 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm/6 font-medium text-black">Password</label>
          <div class="mt-2">
            <input type="password" name="password" id="password" autocomplete="current-password" required="" class="border border-indigo-100 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="button" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const disp = '2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-5xl text-5xl'
const h1 = '2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-2xl'
const h2 = '2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-xl'
const h3 = '2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-lg'
const h4 = '2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-md text-md'
const h5 = '2xl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-sm'
const p  = '2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs text-xs'
const ps = '2xl:text-md xl:text-sm lg:text-xs md:text-xs sm:text-xs text-xs'

const { $auth } = useNuxtApp()
const auth = $auth

const email = ref('')
const pass = ref('')

onMounted(async() => {
  onAuthStateChanged(auth, async(user) => {
    if (!user) {
      return
    }
    else{
      await navigateTo('/sender')
    }
  })
})
</script>