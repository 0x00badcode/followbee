import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
  mutations: {
    SET_AUTH_STATUS(state, status) {
      state.isLoggedIn = status;
    },
  },
  actions: {
    setAuthStatus({ commit }, status) {
      if (status) {
        localStorage.setItem('token', 'loggedIn'); // You can use any value here, as we're not using it.
      } else {
        localStorage.removeItem('token');
      }
      commit('SET_AUTH_STATUS', status);
    },
  },
  modules: {},
});
