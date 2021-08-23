import { createRouter, createWebHashHistory } from 'vue-router';

// Import views.
import Welcome from '__/views/Welcome.vue';
import NotFound from '__/views/NotFound.vue';

// Create the router instance.
export const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Welcome },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
});
