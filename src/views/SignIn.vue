<template>
  <h1>Sign In</h1>
  <Sidebar />
  <SignInForm />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignInForm from '__/components/forms/SignInForm.vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'SignIn',
  components: {
    Sidebar,
    SignInForm,
  },
})
</script>