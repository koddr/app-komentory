<template>
  <div class="container py-2 px-2">
    <h1>Project alias: {{ alias }}</h1>
    <Sidebar />
    <div v-if="isLoading">
      <ContentLoader />
    </div>
    <div v-else>
      <p>{{ project.project_attrs.title }}</p>
      <p>{{ project.created_at }}</p>
      <p>Tasks: {{ project.tasks_count }}</p>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <router-link :to="{ name: 'task-details', params: { alias: task.alias } }">
            {{ task.task_attrs.name }}
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
import ProjectDataService, { ProjectResponse } from '__/services/ProjectDataService'
import ContentLoader from '__/components/loaders/ContentLoader.vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'Project',
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
    const project = ref({})
    const tasks = ref([{}])

    // Define function for getting project by alias.
    const getProjectByAlias = async () => {
      try {
        const { data: project_response }: ProjectResponse = await ProjectDataService.getByAlias(props.alias)
        // Successful response from API server, or failed with warning message.
        if (project_response.status === 200) {
          // Get the project data:
          project.value = project_response.project // add project info
          tasks.value = project_response.project.tasks! // add project tasks array
          // Cancel content loader.
          isLoading.value = false
        } else if (project_response.status === 404) {
          // Failed response from API server.
          router.replace({ name: 'not-found' }) // 404: replace path to Not Found page
        } else console.warn(project_response.msg) // or show error message
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => getProjectByAlias())

    // Return instances and lifecycle hooks.
    return { store, router, project, tasks, isLoading }
  },
})
</script>
