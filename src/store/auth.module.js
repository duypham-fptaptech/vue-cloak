import AuthService from '../service/auth.service';

const account = localStorage.getItem('account');
const initialState = account
  ? { status: { loggedIn: true }, account }
  : { status: { loggedIn: false }, account: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, account) {
      return AuthService.login(account).then(
          account => {
          commit('loginSuccess', account);
          return Promise.resolve(account);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, account) {
      return AuthService.register(account).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, account) {
      state.status.loggedIn = true;
      state.user = account;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
