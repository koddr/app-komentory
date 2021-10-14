<template>
  <ul>
    <li><router-link :to="{ name: 'index' }">Account</router-link></li>
    <li><router-link :to="{ name: 'get-started' }">Get Started</router-link></li>
    <li><router-link :to="{ name: 'projects' }">Projects</router-link></li>
    <li v-if="isUserLoggedIn"><router-link :to="{ name: 'register' }">Register</router-link></li>
    <li v-if="isUserLoggedIn"><router-link :to="{ name: 'login' }">Login</router-link></li>
    <li v-else><router-link :to="{ name: 'logout' }">Logout</router-link></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'Sidebar',
  computed: {
    ...mapGetters(['isUserLoggedIn']),
  },
})
</script>