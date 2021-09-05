<template>
  <p>
    <Input
      v-model="email"
      inputType="email"
      placeholder="Enter email address"
      tabIndex="1"
      isRequired
    />
  </p>
  <p>
    <Input
      v-model="password"
      inputType="password"
      placeholder="Enter password"
      tabIndex="2"
      isRequired
    />
  </p>
  <p><Button @click="signIn" tabIndex="3">Sign In</Button></p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import isAxiosError from 'axios'
import { useStore } from '__/store'
import SignInDataService, { SignInRequest, SignInResponse } from '__/services/SignInDataService'
import Input from '__/components/forms/elements/Input.vue'
import Button from '__/components/forms/elements/Button.vue'

export default defineComponent({
  name: 'SignInForm',
  components: {
    Input,
    Button,
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define needed variables.
    const email = ref('')
    const password = ref('')

    // Define async function for sign in with email and password.
    const signIn = async () => {
      // Define data from components.
      let requestData: SignInRequest = {
        email: email.value,
        password: password.value,
      }

      try {
        // Define await function for sign in.
        const { data } = await SignInDataService.signIn(requestData)
        // Successful response from Auth server.
        store.commit('update_jwt_access_token', data.jwt.token) // add token to store
        store.commit('update_jwt_expire_timestamp', data.jwt.expire) // add expire to store
        router.push({ name: 'index' }) // push Index page
      } catch (error: any) {
        if (isAxiosError(error)) {
          console.log(error)
        } else console.log(error)
      }
    }

    // Return instances and variables.
    return { store, router, email, password, signIn }
  },
})
</script>