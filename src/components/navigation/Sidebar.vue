<template>
  <ul>
    <li><router-link to="/">Account</router-link></li>
    <li><router-link to="/login">Login</router-link></li>
    <li><router-link to="/register">Register</router-link></li>
    <li><router-link to="/projects">Projects</router-link></li>
    <li><router-link to="/logout">Logout</router-link></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
})
</script>