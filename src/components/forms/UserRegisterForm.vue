<template>
  <p>
    <Input v-model="first_name" inputType="text" placeholder="Enter your first name" tabIndex="1" isRequired />
  </p>
  <p>
    <Input v-model="last_name" inputType="text" placeholder="Enter your last name" tabIndex="2" />
  </p>
  <p>
    <Input v-model="email" inputType="email" placeholder="Enter email address" tabIndex="3" isRequired />
  </p>
  <p>
    <Input v-model="password" inputType="password" placeholder="Enter password" tabIndex="4" isRequired />
  </p>
  <SwitchGroup>
    <div class="flex items-center">
      <Switch
        v-model="marketing_email_subscription"
        :class="marketing_email_subscription ? 'bg-main' : 'bg-main-lighter'"
        class="
          relative
          inline-flex
          items-center
          h-7
          transition-colors
          rounded-full
          w-14
          focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
        "
        tabindex="5"
      >
        <span
          :class="marketing_email_subscription ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
        />
      </Switch>
      <SwitchLabel class="ml-4">Subscribe to the marketing emails from Komentory</SwitchLabel>
    </div>
  </SwitchGroup>
  <p><Button @click="signUp" tabIndex="6">Sign Up</Button></p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import UserRegisterDataService, { UserRegisterRequest } from '__/services/UserRegisterDataService'
import PostmarkService, { PostmarkRequest } from '__/services/PostmarkService'
import Input from '__/components/forms/elements/Input.vue'
import Button from '__/components/forms/elements/Button.vue'

export default defineComponent({
  name: 'UserRegisterForm',
  components: {
    Input,
    Button,
    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  setup: () => {
    // Define needed instances.
    const router = useRouter()

    // Define needed variables.
    const email = ref('')
    const password = ref('')
    const first_name = ref('')
    const last_name = ref('')
    const marketing_email_subscription = ref(false)

    // Define async function for register with name, email and password.
    const register = async () => {
      // Define data from components.
      let requestData: UserRegisterRequest = {
        email: email.value,
        password: password.value,
        user_attrs: {
          first_name: first_name.value,
          last_name: last_name.value,
        },
        user_settings: {
          email_subscriptions: {
            marketing: marketing_email_subscription.value,
          },
        },
      }

      // Define data for Postmark request.
      let postmarkData: PostmarkRequest = {
        email: email.value,
        template: 'account-activate',
        variables: {
          first_name: first_name.value,
        },
      }

      try {
        // Define await function for sign up.
        const { data } = await UserRegisterDataService.register(requestData)
        // Successful response from API server.
        if (data.status === 201) {
          // Define await function for send email.
          const { status } = await PostmarkService.send(postmarkData)
          // Successful response from Postmark server and go to user login page,
          // or failed with error message.
          if (status === 200) {
            router.push({ name: 'login' }) // 200: go to User Login page
          } else console.error(`status error ${status}`) // show error message
        } else if (data.status === 400) {
          // Failed response from API server.
          console.warn(data.msg)
        }
      } catch (error: any) {
        console.error(error)
      }
    }

    // Return instances and variables.
    return {
      router,
      first_name,
      last_name,
      email,
      password,
      marketing_email_subscription,
      register,
    }
  },
})
</script>