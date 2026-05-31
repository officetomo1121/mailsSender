<template>
  <div>
		<div class="md:flex mb-3">
			<label for="email" :class="`${p} md:w-1/3 font-noto`">メールアドレス</label>

			<div class="md:w-1/2">
        <input v-model="email" type="email" id="type-email" placeholder="Enter your E-mail" name="email" :class="`${h5} ${placeholderH5} block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`" required autocomplete="email" />
			</div>
		</div>

		<div class="md:flex mb-3">
			<label for="password" :class="`${p} md:w-1/3 font-noto`">パスワード</label>

			<div class="md:w-1/2">
        <input v-model="pass" type="password" id="type-password" placeholder="Enter your password" name="password" :class="`${h5} ${placeholderH5} block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`" required autocomplete="current-password" />
			</div>
		</div>

		<div class="flex justify-center">
			<div class="md:w-5/12 w-full">
        <button v-on:click="" variant="outline-primary" size="md" type="button" class="cursor-pointer block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600" aria-label="ログインボタンです"><p :class="`${p} font-noto`">ログイン</p></button>
			</div>
		</div>
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

const email = ref('')
const pass = ref('')

onMounted(() => {

})
</script>