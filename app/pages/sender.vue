<template>
  <div class="p-2">
    <div class="mb-3">
      <label for="full-name" class="font-[Noto_Sans_JP] block text-sm/6 font-semibold text-gray-900 flex">題名</label>
      <input type="text" v-model="subject" :class="`${p} block w-full border border-slate-300 bg-white px-3.5 py-3 text-base text-gray-900 shadow-lg`"/>
    </div>

    <div class="">
      <label for="full-name" class="font-[Noto_Sans_JP] block text-sm/6 font-semibold text-gray-900 flex">配信内容</label>
      <UEditor
        v-slot="{ editor }"
        v-model="detail"
        :extensions="[ImageUpload]"
        :handlers="customHandlers"
        content-type="html"
        :ui="{ base: 'p-8 sm:px-16' }"
        class="w-full min-h-74 border border-slate-300 shadow-lg mb-3"
      >
        <UEditorToolbar
          :editor="editor"
          :items="items"
          class="sticky border-b border-muted py-2 px-8 sm:px-16 overflow-x-auto"
        />
        <UEditorDragHandle :editor="editor" />
        <UEditorSuggestionMenu :editor="editor" :items="items" :append-to="appendToBody" />
      </UEditor>
      <div class="md:grid grid-cols-2 gap-2 mb-3">
        <textarea v-model="source" class="md:col-span-1 w-full border border-slate-300" rows="10">

        </textarea>
        <textarea v-model="plain" class="md:col-span-1 w-full border border-slate-300" rows="10">

        </textarea>
      </div>
      <div>
        <button class="bg-black text-center text-white p-2 rounded border border-slate-300" @click="sourceToDetail">htmlソースをUEditorへ</button>
      </div>
    </div>

		<hr>

		<div class="flex justify-around pt-3">
			<div class="w-1/3">
				<button v-on:click="nodeSend" variant="outline-primary" size="md" type="button" class="w-full cursor-pointer block rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-lg hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600" aria-label="送信ボタンです"><p>送信</p></button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDocs, collection, getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions"

import { PromisePool } from '@supercharge/promise-pool'

import type { EditorCustomHandlers, EditorToolbarItem } from '@nuxt/ui'
import type { Editor } from '@tiptap/vue-3'
import { ImageUpload } from '../utils/editor/EditorImageUploadExtension'
import type { EditorSuggestionMenuItem } from '@nuxt/ui'

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
