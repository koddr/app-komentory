import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// Create a routes array.
const routes: Array<RouteRecordRaw> = [
  // Account routes:
  { path: '/', name: 'index', component: () => import('__/views/Account.vue') },
  {
    path: '/account/activate',
    name: 'account-activate',
    props: (route) => ({ code: route.query.code }), // ?code=<CODE>
    component: () => import('__/views/AccountActivate.vue'),
  },

  // Login/Logout & Register routes:
  { path: '/login', name: 'login', component: () => import('__/views/UserLogin.vue') },
  { path: '/logout', name: 'logout', component: () => import('__/views/UserLogout.vue') },
  { path: '/register', name: 'register', component: () => import('__/views/UserRegister.vue') },

  // Project routes:
  { path: '/projects', name: 'projects', component: () => import('__/views/Projects.vue') },
  {
    path: '/project/:alias',
    name: 'project-details',
    props: true,
    component: () => import('__/views/Project.vue'),
  },

  // Not found route:
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('__/views/errors/NotFound.vue'),
  },
]

// Create the router instance.
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
