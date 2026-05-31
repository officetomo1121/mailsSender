<template>
  <div class="w-full bg-white py-3 shadow z-3">
      <div class="flex items-center relative h-16 sm:w-auto w-full">
        <div class="absolute w-full text-center top-1/2 -translate-y-1/2 sm:hidden">
          <h1 :class="`${h1} m-0 fw-bold text-center text-nowrap text-slate-500`">MAILS SENDER</h1>
        </div>

        <!-- PC logo -->
        <div class="sm:block hidden">
          <h1 :class="`${h1} m-0 fw-bold text-center text-nowrap text-slate-500`">MAILS SENDER</h1>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { signOut } from "firebase/auth";

const { $auth } = useNuxtApp()
const auth = $auth

const disp = '2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-5xl text-5xl'
const h1 = '2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-2xl'
const h2 = '2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-xl'
const h3 = '2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-lg'
const h4 = '2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-md text-md'
const h5 = '2xl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-sm'
const p  = '2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs text-xs'
const ps = '2xl:text-md xl:text-sm lg:text-xs md:text-xs sm:text-xs text-xs'

onMounted(async () => {

})
</script>
