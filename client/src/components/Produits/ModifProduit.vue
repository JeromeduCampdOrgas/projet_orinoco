<template>
  <div>
    <h1>modif produit</h1>
    {{ setmodifProduit }}
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  name: "ModifProduit",
  data() {
    return {};
  },
  methods: {
    setModifProduit() {
      return store.state.modifProduit;
    },
  },
  beforeMount() {},
  computed: {},
};
</script>

<style></style>
