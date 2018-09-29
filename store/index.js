import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    items: []
  },
  getters: {
    items: state => state.items
  },
  mutations: {
    SET_ITEMS(state, data) {
      state.items = data
    }
  },
  actions: {
    async GET_ITEMS({ commit }) {
      const { data } = await axios.get("http://localhost:3000/api/v1/items")
      commit("SET_ITEMS", data)
    }
  }
})

export default store