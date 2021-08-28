<template>
  <h1>Projects: {{ count }}</h1>
  <Sidebar />
  <ul v-if="!isLoading">
    <li v-for="project in projects" :key="project.id">
      <router-link :to="`/project/${project.alias}`">{{ project.alias }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import ProjectDataService, { ProjectsResponse } from '__/services/ProjectDataService'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'Projects',
  components: {
    Sidebar,
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define needed variables.
    let isLoading = ref(true)
    let count = ref(0)
    let projects = ref([
      {
        id: '',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: '',
        alias: '',
        project_status: 0,
        project_attrs: {
          title: '',
          description: '',
          picture: '',
          url: '',
        },
      },
    ])

    // Define function for getting all projects.
    const getAllProjects = async () => {
      await ProjectDataService.getAll()
        .then((response: ProjectsResponse) => {
          // Successful response from API server.
          projects.value = response.data.projects
          count.value = response.data.count
          isLoading.value = false
        })
        .catch((error: any) => {
          // Failed response from API server.
          if (error.response.status === 401) router.push('/sign/in') // 401: push Sign In page
          console.log(error)
        })
    }

    // Define needed lifecycle hooks.
    onMounted(() => getAllProjects())

    // Return instances and lifecycle hooks.
    return { store, router, count, projects, isLoading }
  },
})
</script>
