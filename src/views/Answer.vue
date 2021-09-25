<template>
  <div class="container py-2 px-2">
    <h1>Answer alias: {{ alias }}</h1>
    <Sidebar />
    <div v-if="isLoading">
      <ContentLoader />
    </div>
    <div v-else>
      <p>{{ answer.answer_attrs.text }}</p>
      <p>{{ answer.created_at }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import AnswerDataService, { AnswerResponse } from '__/services/AnswerDataService'
import ContentLoader from '__/components/loaders/ContentLoader.vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'Answer',
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
    const answer = ref({})

    // Define function for getting task by alias.
    const getAnswerByAlias = async () => {
      try {
        const { data: answer_response }: AnswerResponse = await AnswerDataService.getByAlias(props.alias)
        // Successful response from API server, or failed with warning message.
        if (answer_response.status === 200) {
          // Get the task data:
          answer.value = answer_response.answer // add answer info
          // Get answers by given task id.
          // await getTasksByProjectID(task_response.task.id)
          // Cancel content loader.
          isLoading.value = false
        } else if (answer_response.status === 404) {
          // Failed response from API server.
          router.push({ name: 'not-found' }) // 404: push Not Found page
        } else console.warn(answer_response.msg)
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define function for getting all tasks by project ID.
    // const getTasksByProjectID = async (project_id: string) => {
    //   try {
    //     const { data: tasks_response }: TasksResponse = await TaskDataService.getAllByProjectID(project_id)
    //     // Successful response from API server, or failed with warning message.
    //     if (tasks_response.status === 200) {
    //       // Get tasks data:
    //       tasks.value = tasks_response.tasks // add tasks info
    //     } else console.warn(tasks_response.msg)
    //   } catch (error: any) {
    //     console.error(error)
    //   }
    // }

    // Define needed lifecycle hooks.
    onMounted(() => getAnswerByAlias())

    // Return instances and lifecycle hooks.
    return { store, router, answer, isLoading }
  },
})
</script>
