import { createApp } from 'vue';
import App from './views/App.vue';
import router from './router';
import store from './store';
import Cookies from 'js-cookie';

const app = createApp(App);

function checkTokenCookie() {
  const token = Cookies.get('token');
  if (token) {
    store.dispatch('setAuthStatus', token);
  }
}
checkTokenCookie();

app.use(router);
app.use(store);
app.mount('#app');
