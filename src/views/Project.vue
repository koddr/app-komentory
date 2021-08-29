<template>
  <h1>Project alias: {{ alias }}</h1>
  <Sidebar />
  <div v-if="isLoading">
    <CodeLoader />
  </div>
  <div v-else>
    <p>{{ project.project_attrs.title }}</p>
    <p>{{ project.created_at }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import ProjectDataService, { ProjectResponse } from '__/services/ProjectDataService'
import CodeLoader from '__/components/loaders/CodeLoader.vue'
import Sidebar from '__/components/navigation/Sidebar.vue'

export default defineComponent({
  name: 'Project',
  props: {
    alias: {
      type: String,
      required: true,
    },
  },
  components: {
    CodeLoader,
    Sidebar,
  },
  setup: (props) => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define needed variables.
    const isLoading = ref(true)
    const project = ref({
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
    })

    // Define function for getting project by alias.
    const getProjectByAlias = async () => {
      await ProjectDataService.getByAlias(props.alias)
        .then((response: ProjectResponse) => {
          // Successful response from API server.
          project.value = response.data.project
          isLoading.value = false
        })
        .catch((error: any) => {
          // Failed response from API server.
          if (error.response.status === 401) router.push('/sign/in') // 401: push Sign In page
          console.log(error)
        })
    }

    // Define needed lifecycle hooks.
    onMounted(() => getProjectByAlias())

    // Return instances and lifecycle hooks.
    return { store, router, project, isLoading }
  },
})
</script>
