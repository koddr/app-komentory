<template>
  <ul>
    <li><router-link to="/">Index</router-link></li>
    <li><router-link to="/sign/up">Sign Up</router-link></li>
    <li><router-link to="/sign/in">Sign In</router-link></li>
    <li><router-link to="/projects">Projects</router-link></li>
    <li><router-link to="/project/676a924d3cce0039">Project/1</router-link></li>
    <li><SignOutButton>Sign Out</SignOutButton></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignOutButton from '__/components/navigation/elements/SignOutButton.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SignOutButton,
  },
})
</script>