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
        {{ item.name }}
        <br />
        référence: {{ item._id }}
        <img :src="item.imageUrl" :alt="item.name" />
        <div class="commands" v-if="this.userLoggedIn.isAdmin">
          <img
            class="icons"
            src="../../../public/img/edit.svg"
            alt="edit"
            @click="edit"
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
      test: true,
      selectedProductId: "",
      selectedProduct: "",
    };
  },
  methods: {
    edit: async function(e) {
      let selectedProductId = e.path[2].id;
      /*for (let i = 0; i < this.setProducts.length; i++) {
        if (this.setProducts[i]._id === selectedProductId) {
          this.selectedProduct = this.setProducts[i];
        }
      }*/
      configAxios.get(`product/${selectedProductId}`).then((res) => {
        //console.log(res.data);
        this.selectedProduct = res.data;
        //console.log(this.selectedProduct);
        store.dispatch("getModifProduit", this.selectedProduct);

        this.$router.push("/modification");
      });
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
</style>
