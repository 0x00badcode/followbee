import { createApp } from 'vue';
import App from './views/App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useUserStore } from './store/userStore';

const app = createApp(App);
const pinia = createPinia();

// main.js
if (localStorage.getItem('token')) {
  const userStore = useUserStore(pinia);
  userStore.setAuthStatus(localStorage.getItem('token'));
  userStore.fetchUserData(localStorage.getItem('userId'));
}

app.use(router);
app.use(pinia);
app.mount('#app');
