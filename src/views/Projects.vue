<template>
  <div class="grid grid-cols-1 sm:grid-cols-12 2xl:grid-cols-24">
    <div class="2xl:col-start-7">
      <Sidebar />
    </div>
    <div class="sm:col-span-11 2xl:border-r-main 2xl:border-r 2xl:min-h-screen 2xl:dark:border-r-secondary">
      <div class="py-4 px-2 sm:py-6 sm:px-6">
        <h1 class="line-clamp-1 text-4xl">All projects</h1>
      </div>
      <div class="py-4 px-2 sm:py-6 sm:px-6">
        <div v-if="isLoading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <ProjectsLoader />
        </div>
        <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div v-for="(project, index) in projects" :key="project.id" class="block-item shadow">
            <div class="bg-gradient-to-r from-main to-blue h-24 rounded-t-3xl"></div>
            <div class="py-4 px-6">
              <AuthorCard
                :id="project.author.user_id"
                :first_name="project.author.first_name"
                :last_name="project.author.last_name"
                :picture="project.author.picture"
              />
              <h3 class="my-2 line-clamp-2">{{ project.attrs.title }}</h3>
              <p class="line-clamp-3">{{ project.attrs.description }}</p>
              <Button
                @click="() => $router.push({ name: 'project-details', params: { id: project.id } })"
                :action="'info'"
                :tabIndex="index + 1"
                class="my-4 w-full"
              >
                Watch details
              </Button>
              <div class="text-center text-sm text-gray-300 dark:text-secondary-dark">
                <DateFormatted :date="project.created_at" :withTime="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { ProjectDataService, ProjectsResponse } from '__/services'
import { Sidebar, ProjectsLoader, AuthorCard, Button, DateFormatted } from '__/components'

export default defineComponent({
  name: 'Projects',
  components: {
    Sidebar,
    ProjectsLoader,
    AuthorCard,
    Button,
    DateFormatted,
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
