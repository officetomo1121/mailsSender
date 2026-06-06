<template>
  <header class="flex justify-between shadow-lg border-b border-slate-200"">
    <h3 class="text-sm/6 font-semibold text-gray-900 px-3">MailsSender</h3>
    <div class="p-2 my-3">
      <p class="rounded-md border border-blue-700 bg-white px-4.5 py-1 font-semibold text-nowrap text-blue-700 shadow-xs hover:bg-blue-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer font-noto" @click="glogout">ログアウト</p>
    </div>
  </header>

  <div class="p-2 mt-5">
    <div class="mb-3">
      <label for="full-name" class="block text-sm/6 font-semibold text-gray-900 flex">題名</label>
      <input type="text" v-model="subject" class="block w-full border border-slate-300 bg-white px-3.5 py-3 text-base text-gray-900 shadow-lg"/>
    </div>

    <div class="">
      <label for="full-name" class="block text-sm/6 font-semibold text-gray-900 flex">配信内容</label>
      <ClientOnly>
        <UEditor
          v-slot="{ editor }"
          v-model="detail"
          :extensions="[ImageUpload,
                        TextAlign.configure({
                          types: ['paragraph', 'heading']
                        })
                       ]"
          :handlers="customHandlers"
          content-type="html"
          :ui="{ base: 'p-8 sm:px-16' }"
          class="w-full min-h-74 border border-slate-300 shadow-lg mb-3"
        >
          <UEditorToolbar
            :editor="editor"
            :items="items"
            class="border-b border-muted py-2 px-8 sm:px-16 overflow-x-auto"
          />
          <UEditorDragHandle :editor="editor" />
          <UEditorSuggestionMenu :editor="editor" :items="items" :append-to="appendToBody" />
        </UEditor>
      </ClientOnly>

      <div class="md:grid grid-cols-2 gap-2 mb-3">
        <textarea v-model="source" class="md:col-span-1 w-full border border-slate-300 shadow-lg" rows="10">

        </textarea>
        <textarea v-model="plain" class="md:col-span-1 w-full border border-slate-300 shadow-lg" rows="10">

        </textarea>
      </div>
      <div>
        <button class="my-2 bg-black text-center text-white p-2 rounded border border-slate-300 shadow-lg" @click="sourceToDetail">htmlソースをUEditorへ</button>
      </div>
    </div>

		<hr>

		<div class="pt-3 flex justify-center">
			<div class="w-1/3">
				<button v-on:click="nodeSend" variant="outline-primary" size="md" type="button" class="w-full cursor-pointer block rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-lg hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600" aria-label="送信ボタンです"><p>送信</p></button>
			</div>
		</div>

    <p v-if="results.length > 0">{{ results }}</p>
	</div>
</template>

<script setup lang="ts">
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions"

import { PromisePool } from '@supercharge/promise-pool'

import type { EditorCustomHandlers, EditorToolbarItem } from '@nuxt/ui'
import type { Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align'
import { ImageUpload } from '../utils/editor/EditorImageUploadExtension'
import type { EditorSuggestionMenuItem } from '@nuxt/ui'

const { $auth, $firebaseApp } = useNuxtApp()
const auth = $auth

const subject = ref('')
const detail = ref(`<h1>You can upload image.</h1><p>This editor demonstrates how to create a custom TipTap extension with handlers.</p><p>Click the image button in the toolbar to upload a file — it will show a custom [FileUpload](/docs/components/file-upload) interface before inserting the image.</p><p>Try uploading an image below:</p>`)
const plain = ref('')
const source = ref(detail.value)

const results = ref([])

const customHandlers = {
  imageUpload: {
    canExecute: (editor: Editor) => editor.can().insertContent({ type: 'imageUpload' }),
    execute: (editor: Editor) => editor.chain().focus().insertContent({ type: 'imageUpload' }),
    isActive: (editor: Editor) => editor.isActive('imageUpload'),
    isDisabled: undefined
  }
} satisfies EditorCustomHandlers

const items: EditorSuggestionMenuItem[][] = [
  [
    {
      kind: 'imageUpload',
      icon: 'i-lucide-image',
      label: 'Add image',
      variant: 'soft'
    }
  ],
  [
    {
      icon: 'i-lucide-heading',
      content: {
        align: 'start'
      },
      items: [
        {
          kind: 'heading',
          level: 1,
          icon: 'i-lucide-heading-1',
          label: 'Heading 1'
        },
        {
          kind: 'heading',
          level: 2,
          icon: 'i-lucide-heading-2',
          label: 'Heading 2'
        },
        {
          kind: 'heading',
          level: 3,
          icon: 'i-lucide-heading-3',
          label: 'Heading 3'
        },
        {
          kind: 'heading',
          level: 4,
          icon: 'i-lucide-heading-4',
          label: 'Heading 4'
        },
        {
          kind: 'paragraph',
          label: 'Paragraph',
          icon: 'i-lucide-type'
        }
      ]
    }
  ],
  [
    {
      kind: 'mark',
      mark: 'bold',
      icon: 'i-lucide-bold'
    },
    {
      kind: 'mark',
      mark: 'italic',
      icon: 'i-lucide-italic'
    },
    {
      kind: 'mark',
      mark: 'underline',
      icon: 'i-lucide-underline'
    },
    {
      kind: 'mark',
      mark: 'strike',
      icon: 'i-lucide-strikethrough'
    },
    {
      kind: 'codeBlock',
      label: 'Code Block',
      icon: 'i-lucide-square-code'
    },
    {
      kind: 'horizontalRule',
      label: 'Divider',
      icon: 'i-lucide-separator-horizontal'
    }
  ],
  [
    {
      kind: 'bulletList',
      label: 'Bullet List',
      icon: 'i-lucide-list'
    },
    {
      kind: 'orderedList',
      label: 'Numbered List',
      icon: 'i-lucide-list-ordered'
    },
    {
      kind: 'blockquote',
      label: 'Blockquote',
      icon: 'i-lucide-text-quote'
    }
  ],
  [
    {
      kind: 'link',
      icon: 'i-lucide-link'
    }
  ],
  [
    {
      kind: 'textAlign',
      align: 'left',
      icon: 'i-lucide-align-left'
    },
    {
      kind: 'textAlign',
      align: 'center',
      icon: 'i-lucide-align-center'
    },
    {
      kind: 'textAlign',
      align: 'right',
      icon: 'i-lucide-align-right'
    }
  ]
] satisfies EditorToolbarItem<typeof customHandlers>[][]

const appendToBody = import.meta.client ? () => document.body : undefined

onMounted(async() => {
  onAuthStateChanged(auth, async(user) => {
    if (!user) {
      await navigateTo('/')
    }
  })
})

watch(detail, (v) => {
  source.value = v
  plain.value = v.replace(/<[^>]*>/g, '')
})

function sourceToDetail(){
  detail.value = source.value
}

async function nodeSend(){
  results.value=[]

  if (!import.meta.client) {
    console.error("通信エラー2")

    return;
  }

  const mailsSender = httpsCallable(getFunctions($firebaseApp, "us-central1"),"mailsSender")

  try {
    const res = await mailsSender(
      {
        subject: subject.value,
        detail: detail.value,
        plain: plain.value
      }
    );

    results.value=res.data

    detail.value=''
  }
  catch (error) {
    results.value=res.data
    results.value.push(error)
  }
}

async function glogout(){
  signOut(auth)
}
</script>
