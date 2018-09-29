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
                <a class="button is-link modal-button" data-target="modal-cart" aria-haspopup="true" v-on:click="toggleCartDialog">
                  <span class="icon">
                    <i class="fab fa-twitter"></i>
                  </span>
                  <span>
                    Cart {{ cart.length }} items
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="messages" v-if="messages.length > 0">
      <article class="message is-success">
        <div class="message-header">
          <p>Success</p>
          <button class="delete" aria-label="delete" v-on:click="clearMessage"></button>
        </div>
        <div class="message-body">
          <li v-bind:key="message" v-for="message in messages">{{ message }}</li>
        </div>
      </article>
    </div>

    <div class="contents">
      <div class="columns" v-bind:key="row.index" v-for="row in cardItems">
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
                <button class="button is-link" v-on:click="addToCart(item)">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- カート一覧モーダル -->
    <div id="modal-cart" class="modal" v-bind:class="modalState">
      <div class="modal-background" v-on:click="toggleCartDialog"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Cart</p>
          <button class="delete" aria-label="close" v-on:click="toggleCartDialog"></button>
        </header>
        <section class="modal-card-body">
          <table class="table">
            <tbody>
              <tr v-bind:key="item.id" v-for="item in cartItems">
                <td class="image is-64x64"><img v-bind:src="item.image"></td>
                <td>{{ item.name }}</td>
                <td>¥{{ item.price }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td>¥{{ cartSumPrice }}</td>
              </tr>
            </tfoot>
          </table>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Order</button>
          <button class="button" v-on:click="toggleCartDialog">Cancel</button>
          <button class="button is-danger" v-on:click="clearCart">Clear Cart</button>
        </footer>
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
  data: ()=>{
    return {
      modalOpen: false,
      messages: []
    }
  },
  async fetch ({ store, params }) {
    // https://ja.nuxtjs.org/api/pages-fetch#vuex
    await store.dispatch("GET_ITEMS");
  },
  mounted: () => {
    if (Object.keys(window.localStorage).includes("Nuxt2ShoppingCart") && window.localStorage.getItem("Nuxt2ShoppingCart") != ""){
      let localCache = JSON.parse(window.localStorage.getItem("Nuxt2ShoppingCart"))
      localCache.cart.forEach(function(itemId){
        this.$store.dispatch("ADD_TO_CART", {id: itemId})
      }.bind($nuxt))
    }
  },
  computed: {
    // https://vuex.vuejs.org/ja/guide/getters.html#mapgetters-ヘルパー
    cardItems() {
      let ar = []
      let row = Math.round(this.items.length / 4)
      for(let i = 0; i < row; i++) {
        ar.push({index: i, items: this.items.slice(i*4, (i*4) + 4)})
      }
      return ar
    },
    cartItems(){
      return this.cart.map((itemId)=>{
        let index = this.items.findIndex((item)=>{
          return item.id == itemId
        })
        return this.items[index]
      })
    },
    cartSumPrice(){
      return this.cartItems.reduce((sum, item)=>{
        return sum + item.price
      }, 0)
    },
    modalState(){
      return this.modalOpen ? "is-active" : ""
    },
    ...mapGetters([
      "items", "cart"
    ])
  },
  methods: {
    toggleCartDialog: function(){
      this.modalOpen = !this.modalOpen
    },
    addToCart: function(item){
      this.$store.dispatch("ADD_TO_CART", item)
      window.localStorage.setItem("Nuxt2ShoppingCart", JSON.stringify({
        cart: this.cart
      }))
    },
    clearCart: function(){
      this.$store.dispatch("CLEAR_CART")
      window.localStorage.setItem("Nuxt2ShoppingCart", "")
      this.messages.push("Cart cleard")
      this.toggleCartDialog()
    },
    clearMessage: function(){
      this.messages = []
    }
    // ...mapActions([ "ADD_TO_CART" ])
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
