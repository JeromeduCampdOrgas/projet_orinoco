<template>
  <div>
    <h1>modif produit view</h1>
    <p>Référence: {{ productToModify._id }}</p>

    <div class="container-modify">
      <img :src="productToModify.imageUrl" alt="" />
    </div>
    <form class="form-modify">
      <label for="name">Nom du produit</label>
      <input
        type="text"
        name="name"
        id="name"
        :placeholder="productToModify.name"
      />
      <br />
      <label for="category">Catégorie</label>
      <input
        type="text"
        name="category"
        id="category"
        :placeholder="productToModify.categorie"
      />
      <br />
      <label for="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        :placeholder="productToModify.description"
      />
      <br />
      <label for="price">Prix</label>
      <input
        type="text"
        :placeholder="productToModify.price"
        name="price"
        id="price"
      />
      <br />
      <label for="colors">Couleurs</label>
      <select name="couleurs" id="colors">
        <option v-for="color in this.colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
      <br />
      <label for="stock">Stock</label>
      <input
        type="text"
        :placeholder="productToModify.stock"
        name="stock"
        id="stock"
      />
      <br />
      <button @click="test">test</button>
    </form>
  </div>
</template>

<script>
import store from "../../store/index";

export default {
  name: "ModifProduit",
  data() {
    return {
      productToModify: this.$store.state.modifProduit,
      colors: this.$store.state.modifProduit.colors, // this.setModifs,
    };
  },
  methods: {
    test() {
      console.log(this.colors.length);
    },
  },
  beforeMount() {
    console.log(this.colors);
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
