<template>
  <div>
    <Header />

    <div id="nav">
      <div id="burger" @click="menuvisibility">
        <img
          class="icons"
          src="../public/img/menu.svg"
          alt="menu"
          title="Modifier"
        />
      </div>
      <div id="mobileMenu" v-if="this.menuVisible">
        <router-link v-if="this.setUserLogged" to="/" @click="deconnect"
          >Déconnexion</router-link
        >
        <router-link to="/AllProducts">Tous les produits</router-link>

        <router-link to="/recapitulatif" @click="recapitulatif"
          >Récapitulatif</router-link
        >
        <router-link to="/creation">Nouveau produit</router-link>
      </div>

      <div id="desktopMenu">
        <router-link v-if="this.setUserLogged" to="/" @click="deconnect"
          >Déconnexion</router-link
        >
        <router-link to="/AllProducts" v-if="this.setUserLogged"
          >Tous les produits</router-link
        >

        <router-link
          to="/recapitulatif"
          @click="recapitulatif"
          v-if="this.setUserLogged"
          >Récapitulatif</router-link
        >

        <router-link to="/creation" v-if="this.setUserLogged"
          >Nouveau produit</router-link
        >
        <router-link
          to="/utilisateurs"
          v-if="this.userLoggedIn.isAdmin"
          @click="getusers"
          >Admin utilisateurs</router-link
        >
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import store from "./store/index";
import configAxios from "../../client/src/axios/configAxios";
export default {
  data() {
    return {
      menuVisible: false,
      categories: store.state.categories,
      products: store.state.products,
      produits: [],
      token: localStorage.getItem("token"),
    };
  },
  components: { Header },
  methods: {
    deconnect: function() {
      localStorage.clear();
      window.location.replace("/");
    },
    menuvisibility() {
      this.menuVisible = !this.menuVisible;
    },

    recapitulatif: async function() {
      //console.log(this.categories);
      for (let i = 0; i < this.categories.length; i++) {
        let categorie = new Array();
        let recapproduit = await configAxios.get(
          `categories/${this.categories[i]}`
        );
        //console.log(categorie);
        categorie[i] = this.categories[i]; //(
        categorie[i] = recapproduit;
        console.log(recapproduit);
        this.produits.push(categorie[i]);
      }
      store.dispatch("getRecapProduits", this.produits);
      //this.$router.push("/recapitulatif");
    },
    getusers: async function() {
      await configAxios
        .get("user")
        .then((res) => store.dispatch("getAllUsers", res.data));
    },
  },
  computed: {
    setUserLogged() {
      return store.state.userLogged;
    },
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
    setModifs() {
      return store.state.thisSelectedProduct;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
}

li {
  list-style: none;
  text-align: center;
}
#nav {
  padding: 30px;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;
    background: linear-gradient(rgb(243, 233, 241), #9667da);
    margin: auto 15px;
    padding: 5px;
    &.router-link-exact-active {
      color: white;
    }
  }

  & #mobileMenu {
    display: flex;
    flex-direction: column;
  }
  &#desktopMenu {
    display: none;
  }
}

/************************ */
@media screen and(min-width: 768px) {
  #burger {
    display: none;
    & #mobileMenu {
      display: none;
    }
  }
}
@media screen and(max-width: 768px) {
  #desktopMenu {
    display: none;
  }
}
</style>
