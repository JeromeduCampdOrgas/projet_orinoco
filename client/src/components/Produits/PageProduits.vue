<template>
  <div class="container">
    <div>
      <h1>Nos {{ this.setSelectedProduct }}</h1>
      <p>nb produits: {{ this.setNbProducts }}</p>

      <div
        class="product-categorie"
        v-for="item in setProducts"
        :key="item"
        :id="item._id"
      >
        <div>
          <p>{{ item.name }}</p>
          <p>référence: {{ item._id }}</p>

          <img :src="item.imageUrl" :alt="item.name" />
        </div>
        <div class="commands" v-if="this.userLoggedIn.isAdmin">
          <img
            class="icons"
            src="../../../public/img/edit.svg"
            alt="edit"
            @click="edit"
          />
          <img
            class="icons"
            src="../../../public/img/trash.svg"
            alt="trash"
            @click="trash"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import configAxios from "../../axios/configAxios";

export default {
  data() {
    return {
      selectedProductId: "",
      selectedProduct: "",
      categories: this.$store.state.categories,
    };
  },
  methods: {
    edit: async function(e) {
      let selectedProductId = e.path[2].id;
      console.log(this.selectedProduct);
      configAxios.get(`product/${selectedProductId}`).then((res) => {
        this.selectedProduct = res.data;
        store.dispatch("getModifProduit", this.selectedProduct);

        this.$router.push("/modification");
      });
    },
    trash(e) {
      let selectedProductId = e.path[2].id;
      console.log(e.path);
      console.log(selectedProductId);
      if (this.setNbProducts < 2) {
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i] === this.setSelectedProduct) {
            console.log(this.setSelectedProduct);
            this.categories.splice(i, 1);
            console.log(this.categories);
            store.dispatch("getCategories", this.categories);
          }
        }
      }
      configAxios.delete(`product/${selectedProductId}`).then(() =>
        configAxios.get(`product`).then((res) => {
          store.dispatch("getProducts", res.data);
          this.$router.push("/AllProducts");
        })
      );
    },
  },

  computed: {
    userLoggedIn() {
      return store.state.userLoggedIn;
    },
    setNbProducts() {
      return store.state.pageProduits.length;
    },
    setProducts() {
      return store.state.pageProduits;
    },
    setSelectedProduct() {
      return store.state.selectedCategorie;
    },
  },
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
