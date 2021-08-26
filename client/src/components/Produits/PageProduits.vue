<template>
  <div class="container">
    <div>
      <h1>page Produits</h1>
      <p>nb produits: {{ this.setNbProducts }}</p>
      <div class="product-categorie" v-for="item in setProducts" :key="item">
        {{ item.name }}
        <img :src="item.imageUrl" :alt="item.name" />
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      test: true,
    };
  },
  computed: {
    setNbProducts() {
      return store.state.pageProduits.length;
    },
    setProducts() {
      return store.state.pageProduits;
    },
  },
};
</script>

<style></style>
