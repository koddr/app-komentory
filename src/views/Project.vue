<template>
  <h1>Project ID: {{ id }}</h1>
  <div v-if="isLoading">
    <ContentLoader />
  </div>
  <div v-else>
    <p>
      <router-link :to="{ name: 'projects' }">Back</router-link>
    </p>
    <p>{{ project.attrs.title }}</p>
    <p>{{ project.created_at }}</p>
    <p>Author: {{ project.author.first_name }}</p>
    <p>Tasks: {{ project.tasks_count }}</p>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <router-link :to="{ name: 'task-details', params: { id: task.id } }">{{ task.name }}</router-link> &mdash;
        {{ task.description }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import { UPDATE_CURRENT_PROJECT } from '__/store-constants'
import ProjectDataService, { ProjectResponse } from '__/services/ProjectDataService'
import ContentLoader from '__/components/loaders/ContentLoader.vue'

export default defineComponent({
  name: 'Project',
  props: {
    id: { type: String, required: true },
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
    const project: any = ref({})
    const tasks: any = ref([{}])

    // Define function for getting project by ID.
    const getProjectByID = async () => {
      try {
        const { data: project_response }: ProjectResponse = await ProjectDataService.getByID(props.id)
        // Successful response from API server, or failed with warning message.
        if (project_response.status === 200) {
          // Get the project data:
          project.value = project_response.project // add project info
          tasks.value = project_response.project.tasks! // add project tasks to array
          store.commit(UPDATE_CURRENT_PROJECT, project_response.project) // add current project to store
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
    onMounted(() => getProjectByID())

    // Return instances and lifecycle hooks.
    return { project, tasks, isLoading }
  },
})
</script>
