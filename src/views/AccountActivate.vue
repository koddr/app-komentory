<template>
  <p>Successful activate account</p>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import AccountActivateDataService, {
  AccountActivateRequest,
} from '__/services/AccountActivateDataService'

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
        // Define await function for sign out.
        const { data } = await AccountActivateDataService.activate(requestData)
        // Successful response from Auth server.
        if (data.status === 200) {
          router.push({ name: 'sign-in' }) // push Sign In page
        } else console.warn(data.msg)
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => accountActivate())

    // Return instances.
    return { store, router }
  },
})
</script>