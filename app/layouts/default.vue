<template>
  <div class="max-w-[1920px] mx-auto shadow-lg">
    <Header class="sticky top-0" />

    <slot />

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
const { $auth, $firebaseApp } = useNuxtApp()
const auth = $auth

onMounted(() => {
  
})
</script>