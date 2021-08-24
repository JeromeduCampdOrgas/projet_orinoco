<template>
  <div class="container">
    page Produits
  </div>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      nbProduits: this.setNbProducts,
    };
  },
  methods: {
    setNbProducts() {
      return store.state.pageProduits.length;
    },
  },
};
</script>

<style></style>
