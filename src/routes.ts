import { createRouter, createWebHashHistory } from 'vue-router'

// Import views.
import Index from '__/views/Index.vue'
import SignIn from '__/views/SignIn.vue'
import SignUp from '__/views/SignUp.vue'
import SignOut from '__/views/SignOut.vue'
import Projects from '__/views/Projects.vue'
import Project from '__/views/Project.vue'

// Import error pages.
import NotFound from '__/views/errors/NotFound.vue' // 404

// Create the router instance.
export const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'index', component: Index },
    { path: '/sign/in', name: 'sign-in', component: SignIn },
    { path: '/sign/up', name: 'sign-up', component: SignUp },
    { path: '/sign/out', name: 'sign-out', component: SignOut },
    { path: '/projects', name: 'projects', component: Projects },
    { path: '/project/:alias', name: 'project-details', component: Project, props: true },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  ],
})
