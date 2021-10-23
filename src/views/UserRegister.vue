<template>
  <div class="container px-4 py-4 sm:px-0 sm:py-0">
    <div class="grid items-center justify-center h-screen sm:w-screen">
      <div
        class="
          py-6
          px-6
          sm:py-8 sm:px-10
          2xl:py-10
          mx-auto
          shadow-lg
          rounded-3xl
          bg-white
          dark:bg-secondary-darker dark:border dark:border-secondary dark:shadow-none
        "
      >
        <div class="sm:w-96" v-if="isUserLoggedOut">
          <h1 class="mb-1 text-center">Join Komentory</h1>
          <h2 class="text-center text-sm text-gray-400 dark:text-secondary">
            Sign up to start using project <EmojiHandClap />
          </h2>
          <hr class="mt-6 mb-8" />
          <UserRegisterForm />
          <hr class="mt-8 mb-6" />
          <div class="text-center text-sm">
            Already have an account? <router-link :to="{ name: 'login' }">Login</router-link>!
          </div>
        </div>
        <div class="sm:w-64" v-else>
          <h1 class="mb-8 text-center"><EmojiOtherRobot /> Oh, wait...</h1>
          <div class="text-center">
            <strong>{{ current_user.first_name }},</strong> you're already registered!
          </div>
          <div class="mt-8">
            <Button @click="() => $router.replace({ name: 'index' })" :action="'info'" :tabIndex="1" class="w-full">
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
import { EmojiHandClap, EmojiOtherRobot } from '__/emojis'

export default defineComponent({
  name: 'UserRegister',
  components: {
    UserRegisterForm,
    EmojiHandClap,
    EmojiOtherRobot,
    Button,
  },
  computed: {
    ...mapState(['current_user']),
    ...mapGetters(['isUserLoggedOut']),
  },
})
</script>