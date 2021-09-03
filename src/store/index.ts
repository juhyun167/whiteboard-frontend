import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { service } from "@/service/service";

export default createStore({
  state: {
    authenticated: false,
    user: {
      uid: undefined,
      displayName: "",
    },
  },
  mutations: {
    LOG_IN(state, payload) {
      state.authenticated = true;
      state.user.uid = payload.uid;
      state.user.displayName = payload.displayName;
    },
    LOG_OUT(state) {
      state.authenticated = false;
      state.user = {};
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      const result = await service.login(username, password);
      if (result.success) {
        commit("LOG_IN", {
          uid: result.data.uid,
          displayName: result.data.displayName,
        });
      }
      return result;
    },
    async logout({ commit }) {
      const result = await service.logout();
      commit("LOG_OUT");
      return result;
    },
    async register({ commit }, { displayName, username, password }) {
      return await service.register(displayName, username, password);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
