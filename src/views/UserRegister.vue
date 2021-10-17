<template>
  <div class="container px-4 sm:px-0">
    <div class="grid items-center justify-center h-screen sm:w-screen">
      <div class="py-8 px-8 sm:py-10 sm:px-14 mx-auto bg-white shadow-md rounded-3xl">
        <h1 class="mb-8 text-center text-main"><EmojiOtherBulb /> User Register</h1>
        <UserRegisterForm />
        <hr class="mt-8 mb-6" />
        <div class="text-sm text-center">
          Already have an account? <router-link :to="{ name: 'login' }">Login</router-link>!
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { UserRegisterForm } from '__/components'
import { EmojiOtherBulb } from '__/emojis'

export default defineComponent({
  name: 'UserRegister',
  components: {
    UserRegisterForm,
    EmojiOtherBulb,
  },
  setup: () => {
    // Define needed instances.
    const router = useRouter()

    // Checking, if user is already logged in.
    if (localStorage.getItem('_komentory')) router.replace({ name: 'index' }) // replace current route with Index
  },
})
</script>