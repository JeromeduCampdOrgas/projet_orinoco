<template>
  <div class="container" v-show="isVisible">
    <div>
      <h1>produits</h1>
      <p>admin? {{ userLoggedIn.isAdmin }}</p>
      <p>nb Produits: {{ this.setNbProducts }}</p>
    </div>
    <div
      class="product-categorie"
      v-for="item in this.firstPage"
      v-bind:key="item"
      @click="pageProduits"
    >
      <img :src="item.imageUrl" :alt="item.categorie" />
      {{ item.categorie }}
    </div>
  </div>
</template>

<script>
import store from "../store/index";
import configAxios from "../axios/configAxios";

export default {
  data() {
    return {
      firstPage: [],
      imageUrl: [],
      isVisible: true,
    };
  },
  methods: {
    pageProduits(e) {
      this.isVisible = !this.isVisible;
      let categorie = e.target.alt;
      configAxios
        .get(`product/${categorie}`)
        .then((res) => {
          store.dispatch("getPageProduits", res.data);
          store.dispatch("getSelectedCategorie", categorie);
          this.$router.push(categorie);
          return store.state.selectedCategorie;
        })
        .catch((err) => err);
    },
    productsFirstPage() {
      //let i =0
      for (let categorie of this.setCategories) {
        const found = this.setProducts.find(
          (element) => element.categorie == categorie
        );
        this.firstPage.push(found);
        this.imageUrl.push(found.imageUrl);
        store.dispatch("getFirstPage", this.firstPage);
      }
    },
  },
  beforeMount() {
    this.productsFirstPage();
  },
  setProducts() {
    return store.state.products;
  },
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

    setFirstPage() {
      return this.$store.state.accueil;
    },
    setNbProducts() {
      return store.state.pageProduits.length;
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-around;
}
.form {
  text-align: center;
}
.product-categorie {
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  & img {
    height: 200px;
    width: 200px;
  }
}
</style>
