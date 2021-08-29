<template>
  <h1>Project alias: {{ alias }}</h1>
  <Sidebar />
  <div v-if="isLoading">
    <CodeLoader />
  </div>
  <div v-else>
    <p>{{ project.project_attrs.title }}</p>
    <p>{{ project.created_at }}</p>
    <p>Tasks: {{ tasks_count }}</p>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.task_attrs.title }}</li>
    </ul>
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
    const tasks_count = ref(0)
    const project = ref({
      id: '',
      created_at: new Date(),
      updated_at: new Date(),
      user_id: '',
      alias: '',
      project_status: 0,
      project_attrs: { title: '', description: '', picture: '', url: '' },
    })
    const tasks = ref([
      {
        id: '',
        created_at: new Date(),
        updated_at: new Date(),
        task_attrs: { title: '', description: '', picture: '', url: '' },
      },
    ])

    // Define function for getting project by alias.
    const getProjectByAlias = async () => {
      await ProjectDataService.getByAlias(props.alias)
        .then((response: ProjectResponse) => {
          // Successful response from API server.
          tasks.value = response.data.tasks // add tasks list
          tasks_count.value = response.data.tasks_count // add tasks count
          project.value = response.data.project // add project info
          isLoading.value = false // cancel loader
        })
        .catch((error) => {
          // Failed response from API server.
          if (error.response.status === 401) router.push('/sign/in') // 401: push Sign In page
          console.log(error)
        })
    }

    // Define needed lifecycle hooks.
    onMounted(() => getProjectByAlias())

    // Return instances and lifecycle hooks.
    return { store, router, project, tasks, tasks_count, isLoading }
  },
})
</script>
