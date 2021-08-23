import { createApp } from 'vue';

// Import app routes and stores.
import { routes } from '__/routes';
import { stores } from '__/stores';

// Import app styles.
import '__/assets/css/style.css';

// Import the App component.
import App from '__/App.vue';

// Create a new Vue instance.
const app = createApp(App);

// Install plugins.
app.use(routes);
app.use(stores);

// Mount the App component to the root element.
app.mount('#root');
