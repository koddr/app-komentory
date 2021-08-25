<template>
  <h1>Index</h1>
  <p>
    Go to: <router-link to="/project/1">Project/1</router-link>,
    <router-link to="/projects">Projects</router-link>
  </p>
  <p><Input v-model="email" type="email" placeholder="Enter email address" required /></p>
  <p><Input v-model="password" type="password" placeholder="Enter password" required /></p>
  <p><button type="button" class="px-3 py-2 rounded-lg" @click="signIn">Submit</button></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '__/store'

//
import SignInDataService, { SignInRequest, SignInResponse } from '__/services/SignInDataService'

//
import Input from '__/components/forms/elements/Input.vue'

export default defineComponent({
  name: 'Index',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  components: {
    Input,
  },
  setup: () => {
    //
    const store = useStore()
    return { store }
  },
  methods: {
    async signIn() {
      //
      let data: SignInRequest = {
        email: this.email,
        password: this.password,
      }

      //
      await SignInDataService.signIn(data)
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