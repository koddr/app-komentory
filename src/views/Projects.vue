<template>
  <div class="container py-2 px-2">
    <h1>Projects: {{ count }}</h1>
    <Sidebar />
    <div v-if="isLoading">
      <ContentLoader />
    </div>
    <div v-else>
      <ul>
        <li v-for="project in projects" :key="project.id">
          <router-link :to="`/project/${project.alias}`">{{ project.alias }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import ProjectDataService, { ProjectsResponse } from '__/services/ProjectDataService'
import ContentLoader from '__/components/loaders/ContentLoader.vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'Projects',
  components: {
    ContentLoader,
    Sidebar,
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define needed variables.
    const isLoading = ref(true)
    const count = ref(0)
    const projects = ref([
      {
        id: '',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: '',
        alias: '',
        project_status: 0,
        project_attrs: { title: '', description: '', picture: '', url: '' },
      },
    ])

    // Define function for getting all projects.
    const getAllProjects = async () => {
      try {
        const { data }: ProjectsResponse = await ProjectDataService.getAll()
        // Successful response from API server,
        // or failed with warning message.
        if (data.status === 200) {
          projects.value = data.projects // add projects list
          count.value = data.count // add project count
          isLoading.value = false // cancel loader
        } else if (data.status === 401) {
          // Failed response from API server.
          router.push({ name: 'sign-in' }) // 401: push Sign In page
        } else console.warn(data.msg)
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => getAllProjects())

    // Return instances and lifecycle hooks.
    return { store, router, count, projects, isLoading }
  },
})
</script>
