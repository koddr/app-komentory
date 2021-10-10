<template>
  <h1>Task ID: {{ id }}</h1>
  <div v-if="isLoading">
    <ContentLoader />
  </div>
  <div v-else>
    <p v-if="current_project.alias">
      <router-link :to="{ name: 'project-details', params: { id: current_project.id } }">Back</router-link>
    </p>
    <p>{{ task.attrs.name }}</p>
    <p>{{ task.created_at }}</p>
    <p>Answers: {{ task.answers_count }}</p>
    <h2>Steps</h2>
    <ul>
      <li v-for="step in task.attrs.steps" :key="step.position">{{ step.position }}. {{ step.description }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { mapState } from 'vuex'
import { useRouter } from 'vue-router'
import TaskDataService, { TaskResponse } from '__/services/TaskDataService'
import ContentLoader from '__/components/loaders/ContentLoader.vue'

export default defineComponent({
  name: 'Task',
  props: {
    id: { type: String, required: true },
  },
  components: {
    ContentLoader,
  },
  computed: mapState(['current_project']), // add current project from state
  setup: (props) => {
    // Define needed instances.
    const router = useRouter()

    // Define needed variables.
    const task: any = ref({})
    const isLoading = ref(true)

    // Define function for getting task by ID.
    const getTaskByID = async () => {
      try {
        const { data: task_response }: TaskResponse = await TaskDataService.getByID(props.id)
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
    onMounted(() => getTaskByID())

    // Return instances and lifecycle hooks.
    return { task, isLoading }
  },
})
</script>
