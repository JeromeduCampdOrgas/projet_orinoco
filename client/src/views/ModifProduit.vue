<template>
  <div>
    <h1>modif produit view</h1>
    <div class="container-modify">
      <img :src="productToModify.imageUrl" alt="" />
      {{ productToModify.imageUrl }}
    </div>
    <form class="form-modify">
      <input type="text" placeholder="coucou" />
    </form>
  </div>
</template>

<script>
import store from "../store/index";

export default {
  name: "ModifProduit",
  data() {
    return {
      productToModify: this.$store.state.modifProduit, // this.setModifs,
    };
  },
  methods: {
    /*setModifs() {
      return store.state.modifProduit;
    }*/
  },
  beforeMount() {
    return store.state.modifProduit;
  },
  computed: {},
};
</script>

<style lang="scss">
.container-modify {
  & img {
    height: 200px;
    width: 200px;
  }
}
</style>
