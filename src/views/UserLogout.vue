<template>
  <p>Successful sign out</p>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import UserLogoutDataService from '__/services/UserLogoutDataService'

export default defineComponent({
  name: 'UserLogout',
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define async function for sign out.
    const logout = async () => {
      try {
        // Define await function for sign out.
        await UserLogoutDataService.logout(store.state.jwt_access_token)
        // Successful response from Auth server.
        store.commit('update_jwt_access_token', '') // set token to initial
        store.commit('update_jwt_expire_timestamp', 0) // set expire time to initial
        store.commit('update_current_user', {}) // set current user to initial
        router.push({ name: 'login' }) // push User Login page
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => logout())

    // Return instances.
    return { store, router }
  },
})
</script>