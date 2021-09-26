<template>
  <h1>User Login</h1>
  <UserLoginForm />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserLoginForm from '__/components/forms/UserLoginForm.vue'

export default defineComponent({
  name: 'UserLogin',
  components: {
    UserLoginForm,
  },
})
</script>