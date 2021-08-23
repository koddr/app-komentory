import { createRouter, createWebHashHistory } from 'vue-router';

// Import components.
import Welcome from '__/components/Welcome.vue';
import NotFound from '__/components/NotFound.vue';

// Create the router instance.
export const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Welcome },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
});
