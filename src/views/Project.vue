<template>
  <h1>Project alias: {{ alias }}</h1>
  <Sidebar />
  <div v-if="!isLoading">
    <p>{{ project.project_attrs.title }}</p>
    <p>{{ project.created_at }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import ProjectDataService, { ProjectResponse } from '__/services/ProjectDataService'
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
    Sidebar,
  },
  setup: (props) => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()

    // Define needed variables.
    let isLoading = ref(true)
    let project = reactive({
      id: '',
      user_id: '',
      created_at: new Date(),
      project_attrs: {
        title: '',
        description: '',
      },
    })

    // Define function for getting project by alias.
    const getProjectByAlias = async () => {
      await ProjectDataService.getByAlias(props.alias)
        .then((response: ProjectResponse) => {
          // Successful response from API server.
          project.id = response.data.project.id
          project.user_id = response.data.project.user_id
          project.created_at = response.data.project.created_at
          project.project_attrs = response.data.project.project_attrs
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
