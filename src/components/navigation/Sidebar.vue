<template>
  <ul>
    <li><router-link to="/">Index</router-link></li>
    <li><router-link to="/sign/up">Sign Up</router-link></li>
    <li><router-link to="/sign/in">Sign In</router-link></li>
    <li><router-link to="/projects">Projects</router-link></li>
    <li><router-link to="/project/676a924d3cce0039">Project/1</router-link></li>
    <li><router-link to="/sign/out">Sign Out</router-link></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
})
</script>