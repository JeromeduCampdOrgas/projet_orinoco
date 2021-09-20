<template>
  <PageProduits />
</template>

<script>
import PageProduits from "../components/Produits/PageProduits.vue";
export default {
  name: "PageProduits",
  components: {
    PageProduits,
  },
  methods: {},
};
</script>

<style lang="scss">
.commands {
  & .icons {
    width: 30px;
    height: 30px;
  }
}
.product-categorie {
  width: 250px;
  margin: auto;
  margin-top: 50px;
  border: 1px black solid;
  & img {
    width: 200px;
    height: 200px;
    margin: auto;
  }
}
</style>
