<template>
  <p><Input v-model="email" inputType="email" placeholder="Enter email address" required /></p>
  <p><Input v-model="password" inputType="password" placeholder="Enter password" required /></p>
  <p><Button @click="signIn">Submit</Button></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '__/store'
import SignInDataService, { SignInRequest, SignInResponse } from '__/services/SignInDataService'
import Input from '__/components/forms/elements/Input.vue'
import Button from '__/components/forms/elements/Button.vue'

export default defineComponent({
  name: 'SignInForm',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  components: {
    Input,
    Button,
  },
  setup: () => {
    //
    const store = useStore()
    return { store }
  },
  methods: {
    async signIn() {
      //
      let requestData: SignInRequest = {
        email: this.email,
        password: this.password,
      }

      //
      await SignInDataService.signIn(requestData)
        .then((response: SignInResponse) => {
          //
          this.store.commit('update_jwt_access_token', response.data.jwt.token)
          this.store.commit('update_jwt_expire_timestamp', response.data.jwt.expire)

          //
          this.email = ''
          this.password = ''
        })
        .catch((error: Error) => {
          //
          console.log(error)
        })
    },
  },
})
</script>