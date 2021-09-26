<template>
  <p>Successful activate account</p>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import AccountActivateDataService, {
  AccountActivateRequest,
  AccountActivateResponse,
} from '__/services/AccountActivateDataService'
import PostmarkService, { PostmarkRequest } from '__/services/PostmarkService'

export default defineComponent({
  name: 'AccountActivate',
  props: {
    code: { type: String, required: true },
  },
  setup: (props) => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define async function for sign out.
    const accountActivate = async () => {
      // Define variables.
      let requestData: AccountActivateRequest = {
        code: props.code,
      }

      try {
        // Define await function for activate account.
        const { data }: AccountActivateResponse = await AccountActivateDataService.activate(requestData)
        // Successful response from API server.
        if (data.status === 200) {
          // Define data for Postmark request.
          let postmarkData: PostmarkRequest = {
            email: data.user.email,
            template: 'welcome',
            variables: {
              first_name: data.user.first_name,
            },
          }
          // Define await function for send email.
          const { status } = await PostmarkService.send(postmarkData)
          // Successful response from Postmark server and go to sign in page, or failed with error message.
          if (status === 200) {
            router.push({ name: 'login' }) // 200: go to User Login page
          } else console.error(`status error ${status}`) // or show error message
        } else if (data.status === 400) {
          // Failed response from API server.
          console.warn(data.msg)
        }
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => accountActivate())
  },
})
</script>