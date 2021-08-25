import { createRouter, createWebHashHistory } from 'vue-router'

// Import views.
import Index from '__/views/Index.vue'
import Project from '__/views/Project.vue'
import NotFound from '__/views/NotFound.vue'

// Create the router instance.
export const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/project/:alias', component: Project, props: true },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
})
