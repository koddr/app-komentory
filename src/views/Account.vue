<template>
  <h1>Account</h1>
  <p>Hi, {{ current_user.first_name }}!</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'Account',
  computed: mapState(['current_user']), // add current user from state
})
</script>