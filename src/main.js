import { createApp } from 'vue';
import App from './views/App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

// Check for token in localStorage and update Vuex store
if (localStorage.getItem('token')) {
  store.dispatch('setAuthStatus', localStorage.getItem('token'));
  store.dispatch('fetchUserData'); // Add this line
}

app.use(router);
app.use(store);
app.mount('#app');
