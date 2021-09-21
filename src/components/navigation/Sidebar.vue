<template>
  <ul>
    <li><router-link to="/">Index</router-link></li>
    <li><router-link to="/login">Login</router-link></li>
    <li><router-link to="/register">Register</router-link></li>
    <li><router-link to="/projects">Projects</router-link></li>
    <li><router-link to="/project/676a924d3cce0039">Project/1</router-link></li>
    <li><router-link to="/logout">Logout</router-link></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
})
</script>