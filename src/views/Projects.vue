<template>
  <h1>Projects</h1>
  <Sidebar />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'Projects',
  components: {
    Sidebar,
  },
})
</script>
