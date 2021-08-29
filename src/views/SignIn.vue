<template>
  <div class="container py-2 px-2">
    <h1>Sign In</h1>
    <Sidebar />
    <SignInForm />
  </div>
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