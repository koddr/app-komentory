<template>
  <div class="container px-4 sm:px-0">
    <div class="grid items-center justify-center h-screen sm:w-screen">
      <div
        class="
          py-8
          px-8
          sm:py-10 sm:px-14
          mx-auto
          bg-white
          shadow-md
          rounded-3xl
          dark:bg-secondary-darker dark:border dark:border-secondary dark:shadow-none
        "
      >
        <h1 class="mb-8 text-center text-main"><EmojiOtherLockWithKey /> User Login</h1>
        <UserLoginForm />
        <hr class="mt-8 mb-6" />
        <div class="text-sm text-center">
          No account? <router-link :to="{ name: 'register' }">Register</router-link> a new one!
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { UserLoginForm } from '__/components'
import { EmojiOtherLockWithKey } from '__/emojis'

export default defineComponent({
  name: 'UserLogin',
  components: {
    UserLoginForm,
    EmojiOtherLockWithKey,
  },
  setup: () => {
    // Define needed instances.
    const router = useRouter()

    // Checking, if user is already logged in.
    if (localStorage.getItem('_komentory')) router.replace({ name: 'index' }) // replace current route with Index
  },
})
</script>