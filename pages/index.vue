<template>
  <section class="container">
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <h2 class="title">Nuxt2.0 ShoppingCart</h2>
        </a>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="bd-tw-button button is-link" target="_blank">
                  <span class="icon">
                    <i class="fab fa-twitter"></i>
                  </span>
                  <span>
                    Cart {{ cart.length }} items
                  </span>
                </a>
              </p>
              <!-- <p class="control">
                <a class="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.7.1/bulma-0.7.1.zip">
                  <span class="icon">
                    <i class="fas fa-download"></i>
                  </span>
                  <span>Download</span>
                </a>
              </p> -->
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="contents">
      <div class="columns" v-bind:key="row.index" v-for="row in card_items">
        <div class="column" v-bind:key="item.id" v-for="item in row.items">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img v-bind:src="item.image" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <a><p class="title is-4">{{ item.name }}</p></a>
                  <p class="subtitle is-6">¥ {{ item.price }}</p>
                </div>
              </div>
              <div class="content">
                <button class="button is-link" v-on:click="ADD_TO_CART(item)">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    card_items() {
      let ar = []
      let row = Math.round(this.items.length / 4)
      for(let i = 0; i < row; i++) {
        ar.push({index: i, items: this.items.slice(i*4, (i*4) + 4)})
      }
      return ar
    },
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
