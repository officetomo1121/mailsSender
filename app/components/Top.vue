<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { getFunctions, httpsCallable } from "firebase/functions"
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

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

onMounted(() => {

})
</script>