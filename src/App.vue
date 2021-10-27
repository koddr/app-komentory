<template>
  <router-view v-slot="{ Component, route }">
    <MainMenu v-if="!(route.name === 'login' || route.name === 'register')" />
    <div class="flex flex-col h-screen">
      <transition :name="route.meta.transition || 'fade'" mode="out-in" class="flex-grow">
        <component :is="Component" :key="route.path" />
      </transition>
      <FooterMenu v-if="!(route.name === 'login' || route.name === 'register')" />
    </div>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import { UPDATE_JWT, UPDATE_CURRENT_USER } from '__/store-constants'
import { MainMenu, FooterMenu } from '__/components'
import { TokenDataService as Token, TokenResponse } from '__/services'

export default defineComponent({
  name: 'App',
  components: {
    MainMenu,
    FooterMenu,
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define needed variables.
    const { access_token, expire } = store.state.jwt

    // Define function for renew token.
    const tokenRenew = async () => {
      try {
        const { data: token_response }: TokenResponse = await Token.renew(access_token)
        // Successful response from Auth server.
        if (token_response.status === 200) {
          // Store the token data:
          store.commit(UPDATE_JWT, token_response.jwt) // add JWT data to store
          store.commit(UPDATE_CURRENT_USER, token_response.user) // add user data to store
          // Add a random string to the local storage to indicate that the user is authenticated.
          localStorage.setItem('_komentory', Math.random().toString(36).substring(2, 36))
        } else if (token_response.status === 401) {
          // Failed response from Auth server.
          const { name: current_route } = router.currentRoute.value // get current route name
          // Skip redirect, if current route name is 'register'.
          if (current_route !== 'register') router.push({ name: 'login' }) // 401: push User Login page
        } else console.warn(token_response.msg) // or show error message
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define background async setInterval function for renew token.
    const tokenRenewTimer = setInterval(async () => {
      let now = new Date() // standard now time in milliseconds
      let expire_time = new Date(expire * 1000 - 60000) // subtract 1 minute from expire
      if (expire_time <= now && '_komentory' in localStorage) await tokenRenew() // if expire time is less or equal than now, renew token
    }, 60000) // 1 minute interval

    // If token and expire time not set, try to renew.
    if (access_token === '' && expire === 0) tokenRenew()

    // Define needed lifecycle hooks.
    onMounted(() => tokenRenewTimer)
    onUnmounted(() => clearInterval(tokenRenewTimer))
  },
})
</script>
