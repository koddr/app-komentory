<template>
  <h1>User Register</h1>
  <UserRegisterForm />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserRegisterForm } from '__/components'

export default defineComponent({
  name: 'UserRegister',
  components: {
    UserRegisterForm,
  },
})
</script>