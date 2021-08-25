import { createApp } from 'vue'

// Import app routes and stores.
import { routes } from '__/routes'
import { store, key } from '__/store'

// Import app styles.
import '__/assets/css/style.css'

// Import the App component.
import App from '__/App.vue'

// Create a new Vue instance.
const app = createApp(App)

// Install plugins.
app.use(routes)
app.use(store, key)

// Mount the App component to the root element.
app.mount('#app-komentory')
