<template>
  <div class="container">
    <div>produits</div>
    {{ userLoggedIn.isAdmin }}
    {{ setUserName }}
    {{ setCategories }}
    {{ setProducts[0].name }}

    <input type="button" value="test" @click="test" />
  </div>
</template>

<script>
import store from "../store/index";

export default {
  data() {
    return {
      firstPage: [],
    };
  },
  methods: {
    test() {
      for (let categorie of this.setCategories) {
        const found = this.setProducts.find(
          (element) => element.categorie == categorie
        );
        this.firstPage.push(found);
      }
      console.log(this.firstPage);
    },
  },
  beforeMount() {
    this.test();
  },
  setProducts() {
    return this.$store.state.products;
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
  },
};
</script>

<style lang="scss">
.container,
.form {
  text-align: center;
}
</style>
