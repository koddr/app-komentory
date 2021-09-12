<template>
  <div class="container py-2 px-2">
    <h1>Index</h1>
    <Sidebar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'Account',
  components: {
    Sidebar,
  },
})
</script>