<template>
  <h1>Answer alias: {{ alias }}</h1>
  <div v-if="isLoading">
    <ContentLoader />
  </div>
  <div v-else>
    <p>{{ answer.answer_attrs.text }}</p>
    <p>{{ answer.created_at }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import AnswerDataService, { AnswerResponse } from '__/services/AnswerDataService'
import ContentLoader from '__/components/loaders/ContentLoader.vue'

export default defineComponent({
  name: 'Answer',
  props: {
    alias: { type: String, required: true },
  },
  components: {
    ContentLoader,
  },
  setup: (props) => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define needed variables.
    const isLoading = ref(true)
    const answer = ref({})

    // Define function for getting task by alias.
    const getAnswerByAlias = async () => {
      try {
        const { data: answer_response }: AnswerResponse = await AnswerDataService.getByAlias(props.alias)
        // Successful response from API server, or failed with warning message.
        if (answer_response.status === 200) {
          // Get the task data:
          answer.value = answer_response.answer // add answer info
          // Cancel content loader.
          isLoading.value = false
        } else if (answer_response.status === 404) {
          // Failed response from API server.
          router.replace({ name: 'not-found' }) // 404: replace path to Not Found page
        } else console.warn(answer_response.msg) // or show error message
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => getAnswerByAlias())

    // Return instances and lifecycle hooks.
    return { answer, isLoading }
  },
})
</script>
