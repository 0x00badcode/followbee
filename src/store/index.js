import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    userProfile: localStorage.getItem('userProfile') || '',
  },
  mutations: {
    SET_AUTH_STATUS(state, status) {
      state.isLoggedIn = status;
    },
    SET_USER_PROFILE(state, profile) {
      state.userProfile = profile;
    },
  },
  actions: {
    setAuthStatus({ commit }, status) {
      if (status) {
        localStorage.setItem('token', 'loggedIn');
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
      }
      commit('SET_AUTH_STATUS', status);
    },
    setUserProfile({ commit }, profile) {
      localStorage.setItem('userProfile', profile);
      commit('SET_USER_PROFILE', profile);
    },
  },
  modules: {},
});
