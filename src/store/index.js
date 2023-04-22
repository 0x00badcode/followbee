import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    userProfile: localStorage.getItem('userProfile') || '',
    userData: null,
    userId: null,
    loginType: null,
    username: null,
  },
  mutations: {
    SET_AUTH_STATUS(state, status) {
      state.isLoggedIn = status;
    },
    SET_USER_PROFILE(state, profile) {
      state.userProfile = profile;
    },
    SET_USER_DATA(state, userData) {
      state.userData = userData;
    },
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },
    SET_LOGIN_TYPE(state, loginType) {
      state.loginType = loginType;
    },
    SET_USERNAME(state, username) {
      state.username = username;
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
    setUserId({ commit }, userId) {
      commit('SET_USER_ID', userId);
    },
    setLoginType({ commit }, loginType) {
      commit('SET_LOGIN_TYPE', loginType);
    },
    setUserData({ commit }, { user }) {
        commit("SET_USER_DATA", user);
    },
  },
  modules: {},
});
