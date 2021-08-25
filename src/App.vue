<template>
  <router-view />
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import { useStore } from '__/store'

export default defineComponent({
  name: 'App',
  setup: () => {
    const store = useStore()

    onMounted(() => {
      store.commit('update_jwt_access_token', 'this is jwt')
      store.commit('update_jwt_expire_timestamp', 123456789)
    })

    return { store }
  },
})
</script>
