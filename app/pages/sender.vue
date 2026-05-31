<template>
	<div>

	</div>
</template>

<script setup lang="ts">
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDocs, collection, getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions"

import { PromisePool } from '@supercharge/promise-pool'

const disp = 'font-noto 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-5xl text-5xl'
const h1 = 'font-noto 2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-2xl'
const h2 = 'font-noto 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-xl'
const h3 = 'font-noto 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-lg'
const h4 = 'font-noto 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-md text-md'
const h5 = 'font-noto 2xl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-sm'
const p  = 'font-noto 2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs text-xs'
const ps = 'font-noto 2xl:text-md xl:text-sm lg:text-xs md:text-xs sm:text-xs text-xs'

const placeholderH5 = 'font-noto 2xl:autofill:placeholder:text-2xl xl:autofill:placeholder:text-xl lg:autofill:placeholder:text-lg md:autofill:placeholder:text-md sm:autofill:placeholder:text-sm autofill:placeholder:text-sm'

const { $auth, $firebaseApp } = useNuxtApp()

const db = getFirestore($firebaseApp)
const auth = $auth

onMounted(async() => {
  onAuthStateChanged(auth, async(user) => {
    if (!user) {
      await navigateTo('/')
    }
  })
})
</script>
