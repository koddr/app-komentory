<template>
  <h1>Projects: {{ count }}</h1>
  <div v-if="isLoading">
    <ContentLoader />
  </div>
  <div v-else>
    <div v-for="project in projects" :key="project.id" class="mt-2 mb-2 py-2 px-3 border rounded">
      <router-link :to="{ name: 'project-details', params: { id: project.id } }">
        {{ project.attrs.title }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ProjectDataService, { ProjectsResponse } from '__/services/ProjectDataService'
import ContentLoader from '__/components/loaders/ContentLoader.vue'

export default defineComponent({
  name: 'Projects',
  components: {
    ContentLoader,
  },
  setup: () => {
    // Define needed variables.
    const projects: any = ref([{}])
    const count = ref(0)
    const isLoading = ref(true)

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
