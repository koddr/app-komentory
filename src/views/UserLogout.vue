<template>
  <div class="container px-2 py-4 sm:px-0 sm:py-0">
    <div class="grid items-center justify-center h-screen sm:w-screen">
      <div class="py-6 px-6 sm:py-8 sm:px-8 xl:py-10 mx-auto block-item shadow-lg">
        <div class="w-64">
          <h1 class="mb-8 text-center">Oh, wait...</h1>
          <div class="text-center">You're already logged out!</div>
          <div class="mt-8">
            <Button @click="() => $router.replace({ name: 'login' })" :tabIndex="1" class="w-full">
              Go to login page
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useStore } from '__/store'
import { REMOVE_CURRENT_STATE } from '__/store-constants'
import { UserLogoutDataService } from '__/services'
import { Button } from '__/components'
import { EmojiHandClap } from '__/emojis'

export default defineComponent({
  name: 'UserLogout',
  components: {
    Button,
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()
    const toast = useToast()

    // Define needed variables.
    const { access_token } = store.state.jwt

    // Define async function for sign out.
    const logout = async () => {
      try {
        // Define await function for sign out.
        await UserLogoutDataService.logout(access_token)
        // Send success message.
        toast.info("You're out. We'll be waiting for you again!", { icon: EmojiHandClap })
        // Successful response from Auth server.
        store.commit(REMOVE_CURRENT_STATE) // set state to initial
        localStorage.removeItem('_komentory') // clear local storage
        router.replace({ name: 'login' }) // replace path to User Login page
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => logout())
  },
})
</script>