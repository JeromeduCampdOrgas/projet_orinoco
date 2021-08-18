<template>
  <div class="form" id="form">
    <div id="formHeader">
      <h2>Formulaire de connexion</h2>
    </div>
    <form action="">
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
import configAxios from "../../axios/configAxios";
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
      const email = this.dataConnexion.email;
      const password = this.dataConnexion.password;
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
      const regexPassword = /^(?=.*\d).{4,10}$/; //chaîne de 4 à 10 caractères
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
            //console.log(result);
            localStorage.setItem("token", result.data.token);
          })
          .catch(() => (this.idUncorrect = true));
      }
    },
  },
};
</script>
