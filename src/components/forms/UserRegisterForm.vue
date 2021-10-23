<template>
  <div class="my-3">
    <Input
      v-model="first_name"
      :id="'first_name'"
      :label="'First name'"
      :inputType="'text'"
      :placeholder="'Enter your first name'"
      :helpText="''"
      :tabIndex="1"
      :isRequired="true"
    />
  </div>
  <div class="my-3">
    <Input
      v-model="last_name"
      :id="'last_name'"
      :label="'Last name'"
      :inputType="'text'"
      :placeholder="'Enter your last name'"
      :helpText="''"
      :tabIndex="2"
    />
  </div>
  <div class="my-3">
    <Input
      v-model="email"
      :id="'email'"
      :label="'Email'"
      :inputType="'email'"
      :placeholder="'Enter your email address'"
      :helpText="'Only a valid email, we\'ll send a confirmation email to it.'"
      :tabIndex="3"
      :isRequired="true"
    />
  </div>
  <div class="my-3">
    <Input
      v-model="password"
      :id="'password'"
      :label="'Password'"
      :inputType="'password'"
      :placeholder="'Enter your secret password'"
      :helpText="'At least 8 characters, letters in different registers, numbers.'"
      :tabIndex="4"
      :isRequired="true"
    />
  </div>
  <div class="my-6">
    <SwitchGroup>
      <div class="flex items-center">
        <Switch
          v-model="marketing_email_subscription"
          :class="marketing_email_subscription ? 'bg-main' : 'bg-secondary'"
          :tabindex="5"
          class="
            relative
            inline-flex
            items-center
            h-7
            w-10
            transition-colors
            rounded-full
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
          "
          id="marketing_email_subscription"
        >
          <span
            :class="marketing_email_subscription ? 'translate-x-5' : 'translate-x-1'"
            class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
          />
        </Switch>
        <SwitchLabel class="ml-2 text-sm">Subscribe to the marketing emails</SwitchLabel>
      </div>
    </SwitchGroup>
  </div>
  <div class="mt-6 mb-4">
    <Button @click="register" :action="'success'" :tabIndex="6" class="w-full">And now register me!</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import {
  UserRegisterDataService as User,
  UserRegisterRequest as RegisterRequest,
  PostmarkDataService as Postmark,
  PostmarkRequest,
} from '__/services'
import { Input, Button } from '__/components'
import { EmojiOtherParty } from '__/emojis'

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
    const toast = useToast()

    // Define needed variables.
    const email = ref('')
    const password = ref('')
    const first_name = ref('')
    const last_name = ref('')
    const marketing_email_subscription = ref(false)

    // Define async function for register with name, email and password.
    const register = async () => {
      // Define data from components.
      let requestData: RegisterRequest = {
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
        const { data: user_register } = await User.register(requestData)
        // Successful response from API server.
        if (user_register.status === 201) {
          // Send success message.
          toast.success(`Activation code was sent to ${email.value}. Please check your email!`, {
            icon: EmojiOtherParty,
          })
          // Define await function for send email.
          const { status: postmark_status } = await Postmark.send(postmarkData)
          // Successful response from Postmark server and go to user login page, or failed with error message.
          if (postmark_status === 200) {
            router.push({ name: 'login' }) // 200: go to User Login page
          } else console.error(`status error ${status}`) // or show error message
        } else if (user_register.status === 400) {
          // Failed response from API server.
          console.warn(user_register.msg)
        }
      } catch (error: any) {
        console.error(error)
      }
    }

    // Return instances and variables.
    return { first_name, last_name, email, password, marketing_email_subscription, register }
  },
})
</script>