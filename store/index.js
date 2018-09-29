import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    items: [],
    cart: []
  },
  getters: {
    items: state => state.items,
    cart: state => state.cart
  },
  mutations: {
    SET_ITEMS(state, data) {
      state.items = data
    },
    ADD_TO_CART(state, item) {
      state.cart.push(item.id)
    }
  },
  actions: {
    async GET_ITEMS({ commit }) {
      const { data } = await axios.get("http://localhost:3000/api/v1/items")
      commit("SET_ITEMS", data)
    },
    ADD_TO_CART({ commit }, item) {
      commit("ADD_TO_CART", item)
    }
  }
})

export default store