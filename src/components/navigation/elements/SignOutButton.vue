<template>
  <button type="button" @click="signOut()"><slot></slot></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import isAxiosError from 'axios'
import { useStore } from '__/store'
import SignOutDataService from '__/services/SignOutDataService'

export default defineComponent({
  name: 'SignOutButton',
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define async function for sign out.
    const signOut = async () => {
      try {
        // Define await function for sign out.
        const {} = await SignOutDataService.signOut(store.state.jwt_access_token)
        // Successful response from Auth server.
        store.commit('update_jwt_access_token', '') // set token to initial
        store.commit('update_jwt_expire_timestamp', 0) // set expire time to initial
        router.push({ name: 'sign-in' }) // push Sign In page
      } catch (error: any) {
        if (isAxiosError(error)) {
          console.log(error)
        } else console.log(error)
      }
    }

    //
    return { store, router, signOut }
  },
})
</script>