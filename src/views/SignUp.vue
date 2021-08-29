<template>
  <div class="container py-2 px-2">
    <h1>Sign Up</h1>
    <Sidebar />
    <SignUpForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignUpForm from '__/components/forms/SignUpForm.vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'SignUp',
  components: {
    Sidebar,
    SignUpForm,
  },
})
</script>