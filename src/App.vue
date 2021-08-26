<template>
  <router-view />
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import { useStore } from '__/store'
import TokenDataService, { TokenResponse } from '__/services/TokenDataService'

export default defineComponent({
  name: 'App',
  setup: () => {
    //
    const store = useStore()

    //
    onMounted(() => {
      TokenDataService.renew()
        .then((response: TokenResponse) => {
          //
          store.commit('update_jwt_access_token', response.data.jwt.token)
          store.commit('update_jwt_expire_timestamp', response.data.jwt.expire)
        })
        .catch((error: Error) => {
          //
          console.log(error)
        })
    })

    return { store }
  },
})
</script>
