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
      <h2>Steps</h2>
      <ul>
        <li v-for="step in task.task_attrs.steps" :key="step.position">{{ step.position }}. {{ step.description }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import TaskDataService, { TaskResponse } from '__/services/TaskDataService'
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

    // Define function for getting task by alias.
    const getTaskByAlias = async () => {
      try {
        const { data: task_response }: TaskResponse = await TaskDataService.getByAlias(props.alias)
        // Successful response from API server, or failed with warning message.
        if (task_response.status === 200) {
          // Get the task data:
          task.value = task_response.task // add task info
          // Cancel content loader.
          isLoading.value = false
        } else if (task_response.status === 404) {
          // Failed response from API server.
          router.replace({ name: 'not-found' }) // 404: replace path to Not Found page
        } else console.warn(task_response.msg) // or show error message
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => getTaskByAlias())

    // Return instances and lifecycle hooks.
    return { store, router, task, isLoading }
  },
})
</script>
