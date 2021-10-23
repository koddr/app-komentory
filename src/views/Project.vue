<template>
  <div class="grid grid-cols-1 sm:grid-cols-12 2xl:grid-cols-24">
    <div class="2xl:col-start-7">
      <Sidebar />
    </div>
    <div class="sm:col-span-11 2xl:dark:border-r 2xl:dark:border-secondary">
      <div class="border-b py-4 px-2 sm:py-6 sm:px-6">
        <div class="inline-flex items-center space-x-4">
          <router-link :to="{ name: 'projects' }" class="border-0 hover:text-main-light">
            <ArrowLeftIcon class="h-7 w-7" />
          </router-link>
          <h1>{{ project.title }}</h1>
        </div>
      </div>
      <div class="py-4 px-2 sm:py-6 sm:px-6">
        <div v-if="isLoading">
          <ContentLoader />
        </div>
        <div v-else>
          <p><DateFormatted :date="project.created_at" :withTime="true" /></p>
          <p>
            <AuthorCard
              :id="author.user_id"
              :first_name="author.first_name"
              :last_name="author.last_name"
              :picture="author.picture"
            />
          </p>
          <h2>Tasks ({{ project.tasks_count }})</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="(task, index) in tasks" :key="task.id" class="py-6 px-6 border rounded-xl">
              <h3>Task #{{ index + 1 }}</h3>
              <p class="line-clamp-3">
                <strong>{{ task.name }}.</strong>
                {{ task.description }}
              </p>
              <div class="mt-6">
                <Button
                  @click="() => $router.push({ name: 'task-details', params: { id: task.id } })"
                  :action="'success'"
                  :tabIndex="index + 1"
                  class="w-full"
                >
                  Go to task
                </Button>
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
import { useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/outline'
import { ProjectDataService as Project, ProjectResponse } from '__/services'
import { ContentLoader, Sidebar, DateFormatted, AuthorCard, Button } from '__/components'

export default defineComponent({
  name: 'Project',
  props: {
    id: { type: String, required: true },
  },
  components: {
    ContentLoader,
    Sidebar,
    ArrowLeftIcon,
    DateFormatted,
    AuthorCard,
    Button,
  },
  setup: (props) => {
    // Define needed instances.
    const router = useRouter()

    // Define needed variables.
    const isLoading = ref(true)
    const project: any = ref({})
    const author: any = ref({})
    const tasks: any = ref([{}])

    // Define function for getting project by ID.
    const getProjectByID = async () => {
      try {
        const { data: project_response }: ProjectResponse = await Project.getByID(props.id)
        // Successful response from API server, or failed with warning message.
        if (project_response.status === 200) {
          // Get the project data:
          project.value = {
            created_at: project_response.project.created_at, // add project created at date
            updated_at: project_response.project.updated_at, // add project updated at date
            tasks_count: project_response.project.tasks_count, // add project tasks count
            ...project_response.project.attrs, // add project attributes
          }
          author.value = project_response.project.author // add project author
          tasks.value = project_response.project.tasks // add project tasks
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
    return { project, author, tasks, isLoading }
  },
})
</script>
