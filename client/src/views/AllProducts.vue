<template>
  <div>
    <div>produits</div>
    {{ userLoggedIn.isAdmin }}
    {{ setUserName }}
    {{ setCategories }}
    {{ setProducts[0].name }}
  </div>
</template>

<script>
import store from "../store/index";

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
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
  },
};
</script>

<style></style>
