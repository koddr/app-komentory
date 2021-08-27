<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import TokenDataService, { TokenResponse } from '__/services/TokenDataService'

export default defineComponent({
  name: 'App',
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define function for renew token.
    const tokenRenew = TokenDataService.renew(store.state.jwt_access_token)
      .then((response: TokenResponse) => {
        // Successful response from Auth server.
        store.commit('update_jwt_access_token', response.data.jwt.token) // add to store token
        store.commit('update_jwt_expire_timestamp', response.data.jwt.expire) // add to store expire
      })
      .catch((error: any) => {
        // Failed response from Auth server.
        if (error.response.status === 401) router.push('/sign/in') // 401: push Sign In page
        console.log(error)
      })

    // Define background async setInterval function for renew token.
    const tokenRenewTimer = setInterval(async () => {
      let now = Math.round(new Date().getTime() / 1000) // convert milliseconds to seconds
      let expire = Math.round(store.state.jwt_expire_timestamp - 60000) // subtract 1 minute from expire
      if (expire <= now) await tokenRenew // if expire time is less or equal than now, renew token
    }, 60000) // 1 minute interval

    // If token and expire time not set, try to renew.
    if (store.state.jwt_access_token === '' && store.state.jwt_expire_timestamp === 0) tokenRenew

    // Define needed lifecycle hooks.
    onMounted(() => tokenRenewTimer)
    onUnmounted(() => clearInterval(tokenRenewTimer))

    // Return instances.
    return { store, router, tokenRenewTimer }
  },
})
</script>
