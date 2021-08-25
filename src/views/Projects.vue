<template>
  <h1>Projects</h1>
  <p>
    Go to: <router-link to="/">Index</router-link>,
    <router-link to="/project/1">Project/1</router-link>
  </p>
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
      store.commit('update_jwt_access_token', 'jwt is this')
      store.commit('update_jwt_expire_timestamp', 987654321)
    })

    return { store }
  },
})
</script>
