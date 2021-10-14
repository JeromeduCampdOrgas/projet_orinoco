<template>
  <div class="form" id="form">
    <div id="formHeader">
      <h2>Formulaire de connexion</h2>
    </div>
    <form class="signInForm">
      <div class="form-div">
        <label for="email">email: </label>
        <input
          type="text"
          name="email"
          id="email"
          v-model="dataConnexion.email"
        />
      </div>
      <div class="form-div">
        <label for="password">password: </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="dataConnexion.password"
        />
      </div>
      <p class="alerte" v-show="isVisible">
        L'adresse mail est obligatoire et doit être une adresse valide. <br />
        Le mot de passe est obligatoire et doit comporter entre 4 et 10
        caractères.
      </p>
      <p class="alerte" v-show="idUncorrect">Utilisateur inconnu.</p>
      <div class="form-div">
        <button
          id="validationButton"
          class="submit-button"
          v-on:click.prevent="connexion"
          v-on:keyup.enter="connexion"
        >
          Valider
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import store from "../../store/index";
import configAxios from "../../axios/configAxios";

import jwtDecode from "jwt-decode";
export default {
  name: "Connexion",
  data() {
    return {
      dataConnexion: {
        email: null,
        password: null,
      },
      isVisible: false,
      idUncorrect: false,
    };
  },
  methods: {
    connexion() {
      store.dispatch("getModifAjout", false);
      //Obtenir toutes les catégories
      configAxios
        .get(`product/categories`)
        .then((res) => {
          store.dispatch("getCategories", res.data);
        })
        .catch((err) => err);
      //Obtenir tous les produits
      configAxios
        .get(`product`)
        .then((res) => {
          store.dispatch("getProducts", res.data);
        })
        .catch((err) => err);

      //

      const email = this.dataConnexion.email;
      const password = this.dataConnexion.password;
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
      const regexPassword = /^(?=.*\d).{4,15}$/; //chaîne de 4 à 10 caractères
      if (
        !email ||
        !regexEmail.test(email) ||
        !password ||
        !regexPassword.test(password)
      ) {
        return (this.isVisible = true);
      } else {
        configAxios
          .post(`user/login`, {
            email: email,
            password: password,
          })
          .then((result) => {
            localStorage.setItem("token", result.data.token);
            const decoded = jwtDecode(result.data.token);
            store.dispatch("getUserInfos", decoded);
            store.dispatch("getUserName", result.data.pseudo);
            /********************** */

            /************************************************* */
            //this.$router.push({ path: "/AllProducts" });
            location.replace("/AllProducts");
          })

          .catch(() => (this.idUncorrect = true));
      }
    },
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
  },
};
</script>
<style></style>
