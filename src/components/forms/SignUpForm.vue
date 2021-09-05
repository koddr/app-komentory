<template>
  <p>
    <Input
      v-model="first_name"
      inputType="text"
      placeholder="Enter your first name"
      tabIndex="1"
      isRequired
    />
  </p>
  <p>
    <Input v-model="last_name" inputType="text" placeholder="Enter your last name" tabIndex="2" />
  </p>
  <p>
    <Input
      v-model="email"
      inputType="email"
      placeholder="Enter email address"
      tabIndex="3"
      isRequired
    />
  </p>
  <p>
    <Input
      v-model="password"
      inputType="password"
      placeholder="Enter password"
      tabIndex="4"
      isRequired
    />
  </p>
  <p><Button @click="signUp" tabIndex="5">Sign Up</Button></p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import isAxiosError from 'axios'
import SignUpDataService, { SignUpRequest } from '__/services/SignUpDataService'
import PostmarkService, { PostmarkRequest } from '__/services/PostmarkService'
import Input from '__/components/forms/elements/Input.vue'
import Button from '__/components/forms/elements/Button.vue'

export default defineComponent({
  name: 'SignUpForm',
  components: {
    Input,
    Button,
  },
  setup: () => {
    // Define needed instances.
    const router = useRouter()

    // Define needed variables.
    const first_name = ref('')
    const last_name = ref('')
    const email = ref('')
    const password = ref('')

    // Define async function for sign up with name, email and password.
    const signUp = async () => {
      // Define data from components.
      let requestData: SignUpRequest = {
        email: email.value,
        password: password.value,
        user_attrs: {
          first_name: first_name.value,
          last_name: last_name.value,
        },
      }

      // Define data for Postmark request.
      let postmarkData: PostmarkRequest = {
        email: email.value,
        template: 'activate-my-account',
        variables: {
          first_name: first_name.value,
        },
      }

      try {
        // Define await function for sign up.
        const { status } = await SignUpDataService.signUp(requestData)
        // Check, if sign up response is success.
        if (status === 201) {
          // Define await function for send email.
          const { status } = await PostmarkService.send(postmarkData)
          if (status === 200) router.push({ name: 'sign-in' }) // 200: push Sign In page
        }
      } catch (error: any) {
        if (isAxiosError(error)) {
          console.log(error)
        } else console.log(error)
      }
    }

    // Return instances and variables.
    return { router, first_name, last_name, email, password, signUp }
  },
})
</script>