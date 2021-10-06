<template>
  <div class="container py-2 px-2">
    <Sidebar />
    <hr />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import { UPDATE_JWT, UPDATE_CURRENT_USER } from '__/store-constants'
import TokenDataService, { TokenResponse } from '__/services/TokenDataService'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'App',
  components: {
    Sidebar,
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define needed variables.
    const jwt_access_token = store.state.jwt_access_token
    const jwt_expire_timestamp = store.state.jwt_expire_timestamp

    // Define function for renew token.
    const tokenRenew = async () => {
      try {
        const { data: token_response }: TokenResponse = await TokenDataService.renew(jwt_access_token)
        // Successful response from Auth server.
        if (token_response.status === 200) {
          // Store the token data:
          store.commit(UPDATE_JWT, token_response.jwt) // add JWT data to store
          store.commit(UPDATE_CURRENT_USER, token_response.user) // add user data to store
        } else if (token_response.status === 401) {
          // Failed response from Auth server.
          router.push({ name: 'login' }) // 401: push User Login page
        } else console.warn(token_response.msg) // or show error message
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define background async setInterval function for renew token.
    const tokenRenewTimer = setInterval(async () => {
      let now = new Date() // standard now time in milliseconds
      let expire = new Date(jwt_expire_timestamp * 1000 - 60000) // subtract 1 minute from expire
      if (expire <= now) await tokenRenew() // if expire time is less or equal than now, renew token
    }, 60000) // 1 minute interval

    // If token and expire time not set, try to renew.
    if (jwt_access_token === '' && jwt_expire_timestamp === 0) tokenRenew()

    // Define needed lifecycle hooks.
    onMounted(() => tokenRenewTimer)
    onUnmounted(() => clearInterval(tokenRenewTimer))
  },
})
</script>
