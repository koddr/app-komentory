<template>
  <h1>Projects: {{ count }}</h1>
  <div v-if="isLoading">
    <ContentLoader />
  </div>
  <div v-else>
    <ul>
      <li v-for="project in projects" :key="project.id">
        <router-link :to="{ name: 'project-details', params: { alias: project.alias } }">
          {{ project.alias }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import ProjectDataService, { ProjectsResponse } from '__/services/ProjectDataService'
import ContentLoader from '__/components/loaders/ContentLoader.vue'

export default defineComponent({
  name: 'Projects',
  components: {
    ContentLoader,
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define needed variables.
    const isLoading = ref(true)
    const count = ref(0)
    const projects: any = ref([{}])

    // Define function for getting all projects.
    const getAllProjects = async () => {
      try {
        const { data: projects_response }: ProjectsResponse = await ProjectDataService.getAll()
        // Successful response from API server, or failed with warning message.
        if (projects_response.status === 200) {
          // Get the project data:
          projects.value = projects_response.projects // add projects list
          count.value = projects_response.count // add project count
          // Cancel content loader.
          isLoading.value = false
        } else console.warn(projects_response.msg) // or show error message
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => getAllProjects())

    // Return instances and lifecycle hooks.
    return { count, projects, isLoading }
  },
})
</script>
