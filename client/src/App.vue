<template>
  <div>
    <Header />
    <div id="nav">
      <button v-if="this.setUserLogged" @click="deconnect">Déconnexion</button>
    </div>
    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import store from "./store/index";
export default {
  data() {
    return {};
  },
  components: { Header },
  methods: {
    deconnect: function() {
      localStorage.clear();
      window.location.replace("/");
    },
  },
  computed: {
    setUserLogged() {
      return store.state.userLogged;
    },
    userLoggedIn() {
      return store.state.userLoggedIn;
    },
    setUserName() {
      return this.$store.state.userName;
    },

    setCategories() {
      return this.$store.state.categories;
    },
    setProducts() {
      return this.$store.state.products;
    },

    setFirstPage() {
      return this.$store.state.accueil;
    },
    setNbProducts() {
      return store.state.pageProduits.length;
    },
    setModifs() {
      return store.state.thisSelectedProduct;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
