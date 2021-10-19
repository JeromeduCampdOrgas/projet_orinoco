<template>
  <div>
    <div>
      <h1>Tous les produits</h1>
    </div>
    <div class="container">
      <!--v-show="isVisible"-->
      <div
        class="product-categorie"
        v-for="item in this.firstPage"
        v-bind:key="item"
        @click="pageProduits"
      >
        <div class="image">
          <img :src="item.imageUrl" :alt="item.categorie" />
        </div>
        <p>{{ item.categorie }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import configAxios from "../../axios/configAxios";

export default {
  data() {
    return {
      firstPage: [],
      imageUrl: [],
      isVisible: true,
      categories: store.state.categories,
      products: store.state.products,
      produits: [],
    };
  },
  methods: {
    pageProduits(e) {
      //this.isVisible = !this.isVisible;
      let categorie = e.target.alt;
      configAxios
        .get(`categories/${categorie}`)
        .then((res) => {
          console.log(res.data);
          store.dispatch("getPageProduits", res.data);
          store.dispatch("getSelectedCategorie", categorie);
          this.$router.push(categorie);
          //return store.state.selectedCategorie;
        })
        .catch((err) => err);
    },
    productsFirstPage() {
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
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.form {
  text-align: center;
}
.product-categorie {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 15px auto;
  width: 80%;

  & .image {
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  & p {
    font-weight: bold;
  }
}
.product-categorie:hover {
  cursor: pointer;
}
@media only screen and (min-width: 768px) {
  .container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
    width: 100%;
    & .product-categorie {
      width: 30%;
      margin: 15px auto;
      border: 2px lightgray solid;
      box-shadow: 2px 2px #9667da;
    }
  }
}
</style>
