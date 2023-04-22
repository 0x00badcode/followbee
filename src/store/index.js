import { createStore } from 'vuex';
import { getUserInfo as fetchUserInfo } from '@/api/apiFunctions';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    userProfile: localStorage.getItem('userProfile') || '',
    userData: null,
    userId: null,
    loginType: null,
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
    async fetchUserData({ commit }, userId, token) {
      const userData = await fetchUserInfo(userId, token);
      commit('SET_USER_DATA', userData);
    },
    setUserId({ commit }, userId) {
      commit('SET_USER_ID', userId);
    },
    setLoginType({ commit }, loginType) {
      commit('SET_LOGIN_TYPE', loginType);
    },
    async getUserInfo({ commit }, { userId, token }) {
      const userInfo = await fetchUserInfo(userId, token);
      if (userInfo.success) {
        commit('SET_USER_DATA', userInfo.data);
        commit('SET_USER_ID', userInfo.data._id);
        commit('SET_LOGIN_TYPE', userInfo.data.loginType);
      }
    },
  },
  modules: {},
});
