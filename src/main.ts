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

// Mount the App component to the root element.
app.mount('#app-komentory')
