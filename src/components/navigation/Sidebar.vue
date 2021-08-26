<template>
  <p>
    Go to: <router-link to="/">Index</router-link>,
    <router-link to="/sign/in">Sign In</router-link>,
    <router-link to="/projects">Projects</router-link>,
    <router-link to="/project/1">Project/1</router-link>,
    <button @click="signOut()">Sign Out</button>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import SignOutDataService from '__/services/SignOutDataService'

export default defineComponent({
  name: 'Sidebar',
  setup: () => {
    //
    const store = useStore()
    const router = useRouter()

    //
    const signOut = async () => {
      await SignOutDataService.signOut(store.state.jwt_access_token)
        .then(() => {
          // Successful response from Auth server.
          store.commit('update_jwt_access_token', '') // set token to initial
          store.commit('update_jwt_expire_timestamp', 0) // set expire time to initial
          router.push('/sign/in') // push Sign In page
        })
        .catch((error: any) => console.log(error))
    }

    //
    return { store, router, signOut }
  },
})
</script>