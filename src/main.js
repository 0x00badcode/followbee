import { createApp } from 'vue';
import App from './views/App.vue';
import router from './router';
import { createPinia } from 'pinia';
// import store from './store';

const app = createApp(App);
const pinia = createPinia();

// Check for token in localStorage and update Pinia store
if (localStorage.getItem('token')) {
  const userStore = pinia._p.get("userStore"); // Get the userStore from Pinia
  userStore.setAuthStatus(localStorage.getItem('token'));
  userStore.fetchUserData(); // Add this line
}

app.use(router);
app.use(pinia); // Use Pinia instead of Vuex
app.mount('#app');
