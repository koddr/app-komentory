import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// Create a routes array.
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'index', component: () => import('__/views/Index.vue') },
  { path: '/sign/in', name: 'sign-in', component: () => import('__/views/SignIn.vue') },
  { path: '/sign/up', name: 'sign-up', component: () => import('__/views/SignUp.vue') },
  { path: '/sign/out', name: 'sign-out', component: () => import('__/views/SignOut.vue') },
  { path: '/projects', name: 'projects', component: () => import('__/views/Projects.vue') },
  {
    path: '/project/:alias',
    name: 'project-details',
    props: true,
    component: () => import('__/views/Project.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('__/views/errors/NotFound.vue'),
  },
]

// Create the router instance.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})
