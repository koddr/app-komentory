<template>
  <Sidebar />
  <h1>{{ alias }}</h1>
  <p>{{ store.state.jwt_access_token }}</p>
  <p>{{ store.state.jwt_expire_time }}</p>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import { useStore } from '__/store'

// Import used components.
import Sidebar from '__/components/Sidebar.vue'

export default defineComponent({
  name: 'Project',
  props: {
    alias: {
      type: String,
      required: true,
    },
  },
  components: {
    Sidebar,
  },
  setup: () => {
    const store = useStore()

    onMounted(() => {
      store.commit('update_jwt_access_token', 'this is jwt')
      store.commit('update_jwt_expire_time', 1234567890)
    })

    return { store }
  },
})
</script>
