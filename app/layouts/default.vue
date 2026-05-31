<template>
  <div class="max-w-[1920px] mx-auto">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
const { $auth, $firebaseApp } = useNuxtApp()
const auth = $auth

onMounted(() => {
  
})
</script>