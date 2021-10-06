<template>
  <p>Successful sign out</p>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useStore } from '__/store'
import { REMOVE_CURRENT_STATE } from '__/store-constants'
import UserLogoutDataService from '__/services/UserLogoutDataService'
import EmojiHandClap from '__/components/emoji/hand/Clap.vue'

export default defineComponent({
  name: 'UserLogout',
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()
    const toast = useToast()

    // Define async function for sign out.
    const logout = async () => {
      try {
        // Define await function for sign out.
        await UserLogoutDataService.logout(store.state.jwt_access_token)
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