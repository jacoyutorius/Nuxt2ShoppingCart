<template>
  <section class="container">
    <div class="title">
      <h2>Nuxt2.0 ShoppingCart</h2>
    </div>

    <div>
      <table class="table">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Price</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="item.id" v-for="item in items">
            <td>{{ item.id }}</td>
            <td class="image is-96x96"><img v-bind:src="item.image" width="96" height="96">
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td><button class="button is-link is-small" v-on:click="ADD_TO_CART(item)">Add</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      {{ cart.length }} items
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { mapGetters, mapActions } from "vuex";

export default {
  // components: {
  //   Logo
  // },
  async fetch ({ store, params }) {
    // https://ja.nuxtjs.org/api/pages-fetch#vuex
    await store.dispatch("GET_ITEMS");
  },
  computed: {
    // https://vuex.vuejs.org/ja/guide/getters.html#mapgetters-ヘルパー
    ...mapGetters([
      "items", "cart"
    ])
  },
  methods: {
    ...mapActions([ "ADD_TO_CART" ])
  }
}
</script>

<style>

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

</style>
