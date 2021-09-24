import { createApp } from 'vue'

// Import App routes and stores.
import { router } from '__/router'
import { store, key } from '__/store'

// Import App styles.
import '__/assets/css/style.css'

// Import the App component.
import App from '__/App.vue'

// Create a new Vue instance.
const app = createApp(App)

// Install plugins.
app.use(router)
app.use(store, key)

// Set middleware before each route.
router.beforeEach((to) => {
  // Checking router meta and user authentication.
  if (to.meta.requiresAuth && !localStorage.getItem('_komentory')) {
    // If not, redirect to User Login page.
    return {
      path: '/login',
      query: { redirect: to.fullPath }, // save the location we were at to come back later
    }
  }
})

// Mount the App component to the root element.
app.mount('#app-komentory')
