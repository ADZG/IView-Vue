import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: ""
  },
  mutations: {},
  actions: {},
  getters: {
    getusername(state) {
      return state.username;
    }
  }
});
