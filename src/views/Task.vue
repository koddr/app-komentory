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
      <!-- <ul>
        <li v-for="answer in answers" :key="answer.id">
          <router-link :to="{ name: 'answer-details', params: { alias: answer.alias } }">
            {{ answer.answer_attrs.alias }}
          </router-link>
        </li>
      </ul> -->
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
          // Get answers by given task id.
          // await getTasksByProjectID(task_response.task.id)
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
    onMounted(() => getTaskByAlias())

    // Return instances and lifecycle hooks.
    return { store, router, task, isLoading }
  },
})
</script>
