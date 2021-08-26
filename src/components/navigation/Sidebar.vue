<template>
  <p>
    Go to: <router-link to="/">Index</router-link>,
    <router-link to="/sign/in">Sign In</router-link>,
    <router-link to="/projects">Projects</router-link>,
    <router-link to="/project/1">Project/1</router-link>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
})
</script>