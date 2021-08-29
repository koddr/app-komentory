<template>
  <div class="container py-2 px-2">
    <h1>Projects: {{ count }}</h1>
    <Sidebar />
    <div v-if="isLoading">
      <CodeLoader />
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
import CodeLoader from '__/components/loaders/CodeLoader.vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'Projects',
  components: {
    CodeLoader,
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
      await ProjectDataService.getAll()
        .then((response: ProjectsResponse) => {
          // Successful response from API server.
          projects.value = response.data.projects // add projects list
          count.value = response.data.count // add project count
          isLoading.value = false // cancel loader
        })
        .catch((error) => {
          // Failed response from API server.
          if (error.response.status === 401) router.push({ name: 'sign-in' }) // 401: push Sign In page
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
