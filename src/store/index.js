import api from '@/services/api';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: localStorage.getItem('token') || '',
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
  },
  getters: {
    isAuthenticated: state => !!state.token,
    userName: (state) => state.userName,
    userRole: state => state.role,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      console.log('Setting token:', token);
      state.token = token;
      localStorage.setItem('token', token);
    },
    setRole(state, role) {
      state.role = role;
      localStorage.setItem('role', role);
    },
    setUserName(state, userName) {
      state.userName = userName;
      localStorage.setItem('userName', userName);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/login', credentials);
        console.log('Login response:', response);
        const token = response.data.access_token;
        commit('setToken', token);
        commit('setUserName', response.data.userName);
        commit('setRole', response.data.role);
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
    async logout({ commit }, credentials) {
      try {
        await api.post('/logout', credentials);
        commit('clearToken');
        
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
  },
});

export default store;