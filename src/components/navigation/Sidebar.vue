<template>
  <ul>
    <li><router-link to="/">Index</router-link></li>
    <li><router-link to="/sign/up">Sign Up</router-link></li>
    <li><router-link to="/sign/in">Sign In</router-link></li>
    <li><router-link to="/projects">Projects</router-link></li>
    <li><router-link to="/project/676a924d3cce0039">Project/1</router-link></li>
    <li><button @click="signOut()">Sign Out</button></li>
  </ul>
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
          router.push({ name: 'sign-in' }) // push Sign In page
        })
        .catch((error: any) => console.log(error))
    }

    //
    return { store, router, signOut }
  },
})
</script>