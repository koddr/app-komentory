<template>
  <div class="container py-2 px-2">
    <h1>User Login</h1>
    <Sidebar />
    <UserLoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserLoginForm from '__/components/forms/UserLoginForm.vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'UserLogin',
  components: {
    Sidebar,
    UserLoginForm,
  },
})
</script>