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
        <div v-if="isUserLoggedOut">
          <h1 class="mb-8 text-center"><EmojiOtherBulb /> User Register</h1>
          <UserRegisterForm />
          <hr class="mt-8 mb-6" />
          <div class="text-sm text-center">
            Already have an account? <router-link :to="{ name: 'login' }">Login</router-link>!
          </div>
        </div>
        <div v-else>
          <h1 class="mb-8 text-center"><EmojiHandOk /> Hey, {{ current_user.first_name }}</h1>
          <div class="text-center">You're already logged in!</div>
          <div class="mt-8">
            <Button @click="() => $router.replace({ name: 'index' })" :tabIndex="1" class="w-full">
              Go to account
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapGetters } from 'vuex'
import { UserRegisterForm, Button } from '__/components'
import { EmojiOtherBulb, EmojiHandOk } from '__/emojis'

export default defineComponent({
  name: 'UserRegister',
  components: {
    UserRegisterForm,
    EmojiOtherBulb,
    EmojiHandOk,
    Button,
  },
  computed: {
    ...mapState(['current_user']),
    ...mapGetters(['isUserLoggedOut']),
  },
})
</script>