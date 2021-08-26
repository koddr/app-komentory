<template>
  <h1>Index</h1>
  <Sidebar />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Sidebar,
  },
})
</script>