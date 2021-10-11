<template>
  <h1>Answers for task ID: {{ id }}</h1>
  <div v-if="isLoading">
    <ContentLoader />
  </div>
  <div v-else>
    <p>
      <router-link :to="{ name: 'task-details', params: { id } }">Back</router-link>
    </p>
    <div v-for="answer in answers" :key="answer.id" class="mt-2 mb-2 py-2 px-3 border rounded">
      <p class="truncate">
        <router-link :to="{ name: 'answer-details', params: { id: answer.id } }">
          {{ answer.attrs.description }}
        </router-link>
      </p>
      <p>{{ answer.author.first_name }} {{ answer.author.last_name }}</p>
      <DateFormatted :date="answer.created_at" :locale="'en-US'" :withTime="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AnswerDataService, { AnswersResponse } from '__/services/AnswerDataService'
import ContentLoader from '__/components/loaders/ContentLoader.vue'
import DateFormatted from '__/components/helpers/DateFormatted.vue'

export default defineComponent({
  name: 'Answers',
  props: {
    id: { type: String, required: true },
  },
  components: {
    ContentLoader,
    DateFormatted,
  },
  setup: (props) => {
    // Define needed instances.
    const router = useRouter()

    // Define needed variables.
    const isLoading = ref(true)
    const answers: any = ref([{}])

    // Define function for getting answers by task ID.
    const getAnswerByTaskID = async () => {
      try {
        const { data: answers_response }: AnswersResponse = await AnswerDataService.getAllByTaskID(props.id)
        // Successful response from API server, or failed with warning message.
        if (answers_response.status === 200) {
          // Get the task data:
          answers.value = answers_response.answers // add answers info
          // Cancel content loader.
          isLoading.value = false
        } else if (answers_response.status === 404) {
          // Failed response from API server.
          router.replace({ name: 'not-found' }) // 404: replace path to Not Found page
        } else console.warn(answers_response.msg) // or show error message
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => getAnswerByTaskID())

    // Return instances and lifecycle hooks.
    return { answers, isLoading }
  },
})
</script>
