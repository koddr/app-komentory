<template>
  <div class="container py-2 px-2">
    <h1>Task alias: {{ alias }}</h1>
    <Sidebar />
    <div v-if="isLoading">
      <ContentLoader />
    </div>
    <div v-else>
      <p>{{ task.task_attrs.name }}</p>
      <p>{{ task.created_at }}</p>
      <p>Answers: {{ task.answers_count }}</p>
      <ul>
        <li v-for="answer in answers" :key="answer.id">
          <router-link :to="{ name: 'answer-details', params: { alias: answer.alias } }">
            {{ answer.alias }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import TaskDataService, { TaskResponse } from '__/services/TaskDataService'
import AnswerDataService, { AnswersResponse } from '__/services/AnswerDataService'
import ContentLoader from '__/components/loaders/ContentLoader.vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'Task',
  props: {
    alias: { type: String, required: true },
  },
  components: {
    ContentLoader,
    Sidebar,
  },
  setup: (props) => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define needed variables.
    const isLoading = ref(true)
    const task = ref({})
    const answers = ref([{}])

    // Define function for getting task by alias.
    const getTaskByAlias = async () => {
      try {
        const { data: task_response }: TaskResponse = await TaskDataService.getByAlias(props.alias)
        // Successful response from API server, or failed with warning message.
        if (task_response.status === 200) {
          // Get the task data:
          task.value = task_response.task // add task info
          // Get answers by given task id.
          await getAnswersByTaskID(task_response.task.id)
          // Cancel content loader.
          isLoading.value = false
        } else if (task_response.status === 404) {
          // Failed response from API server.
          router.push({ name: 'not-found' }) // 404: push Not Found page
        } else console.warn(task_response.msg)
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define function for getting all answers by task ID.
    const getAnswersByTaskID = async (task_id: string) => {
      try {
        const { data: answers_response }: AnswersResponse = await AnswerDataService.getAllByTaskID(task_id)
        // Successful response from API server, or failed with warning message.
        if (answers_response.status === 200) {
          // Get tasks data:
          answers.value = answers_response.answers // add answers info
        } else console.warn(answers_response.msg)
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => getTaskByAlias())

    // Return instances and lifecycle hooks.
    return { store, router, task, answers, isLoading }
  },
})
</script>
