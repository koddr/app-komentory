<template>
  <p>
    <Input v-model="email" inputType="email" placeholder="Enter email address" tabIndex="1" isRequired />
  </p>
  <p>
    <Input v-model="password" inputType="password" placeholder="Enter password" tabIndex="2" isRequired />
  </p>
  <p><Button @click="login" tabIndex="3">Login</Button></p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useStore } from '__/store'
import { UPDATE_JWT, UPDATE_CURRENT_USER } from '__/store-constants'
import UserLoginDataService, { UserLoginRequest } from '__/services/UserLoginDataService'
import Input from '__/components/forms/elements/Input.vue'
import Button from '__/components/forms/elements/Button.vue'
import EmojiHandWave from '__/components/emoji/hand/Wave.vue'

export default defineComponent({
  name: 'UserLoginForm',
  components: {
    Input,
    Button,
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()
    const toast = useToast()

    // Define needed variables.
    const email = ref('')
    const password = ref('')

    // Define async function for user login with email and password.
    const login = async () => {
      // Define data from components.
      let requestData: UserLoginRequest = {
        email: email.value,
        password: password.value,
      }

      try {
        // Define await function for user login.
        const { data } = await UserLoginDataService.login(requestData)
        // Successful response from Auth server, or failed with error message.
        if (data.status === 200) {
          // Send success message.
          toast.success(`Hey, ${data.user.user_attrs.first_name}. Welcome to your account!`, { icon: EmojiHandWave })
          // Store response data:
          store.commit(UPDATE_JWT, data.jwt) // add JWT data to store
          store.commit(UPDATE_CURRENT_USER, data.user) // add user data to store
          // Add a random string to the local storage to indicate that the user is authenticated.
          localStorage.setItem('_komentory', Math.random().toString(36).substring(2, 36))
          // Catch saved route in ?redirect= query.
          const { redirect } = router.currentRoute.value.query
          // Checking, if redirect route is exists.
          if (redirect) {
            router.replace({ path: String(redirect) }) // 200: replace current route to saved
          } else router.push({ name: 'index' }) // 200: push Index page
        } else console.warn(data.msg)
      } catch (error: any) {
        console.error(error)
      }
    }

    // Return instances and variables.
    return { email, password, login }
  },
})
</script>