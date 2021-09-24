<template>
  <div class="container py-2 px-2">
    <h1>User Register</h1>
    <Sidebar />
    <UserRegisterForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserRegisterForm from '__/components/forms/UserRegisterForm.vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'UserRegister',
  components: {
    Sidebar,
    UserRegisterForm,
  },
})
</script>