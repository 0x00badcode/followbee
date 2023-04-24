import { createStore } from 'vuex';
import api from '../api/api';

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    userProfile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
    userData: {},
    userId: null,
    loginType: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
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
  },
  actions: {
    setAuthStatus({ commit }, token) {
      if (token) {
        localStorage.setItem('token', token);
        commit('SET_TOKEN', token);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
        commit('SET_TOKEN', null);
      }
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
    async fetchUserData({ commit }, userId) {
      try {
        const response = await api.get(`/user/${userId}`);
        const userData = response.data;
        commit("SET_USER_DATA", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    userProfile: (state) => state.userProfile,
    userData: (state) => state.userData,
    userId: (state) => state.userId,
    loginType: (state) => state.loginType,
    username: (state) => state.userData.username,
  },
  modules: {},
});
