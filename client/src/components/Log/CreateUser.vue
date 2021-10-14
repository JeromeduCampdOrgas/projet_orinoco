<template>
  <div class="bloc-modale" v-if="revele">
    {{ this.dataUser.password }}
    <div class="overlay" @click="toggleModale"></div>

    <div class="modale ">
      <div class="btn-modale btn btn-danger" @click="toggleModale">X</div>
      <h2>Nouvel utilisateur</h2>
      <form action="">
        <div>
          <label for="name">Pseudo</label>
          <input id="nom" type="text" v-model="this.dataUser.pseudo" />
        </div>
        <div>
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            v-model="this.dataUser.email"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="this.dataUser.password"
          />
        </div>
        <div id="admin">
          <label for="isAdmin">Admin</label>
          <input
            type="checkbox"
            v-model="this.dataUser.isAdmin"
            @click="admin"
          />
        </div>
        <div>
          <p class="alert" v-if="alerte">
            Un pseudo, un email et un mot de passe valides sont requis
          </p>
          <div id="buttons">
            <button class="btn-success" @click="createUser">Valider</button>
            <button class="btn-danger" @click="toggleModale, erreur">
              Annuler
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import configAxios from "../../axios/configAxios";
import store from "../../store/index";
export default {
  name: "Modale",
  props: ["revele", "toggleModale"],
  data() {
    return {
      dataUser: {
        pseudo: "",
        email: "",
        password: "",
        isAdmin: false,
      },
      alerte: false,
      users: this.$store.state.users,
    };
  },
  methods: {
    erreur: function() {
      if (this.alerte) {
        this.alerte = false;
      }
    },
    admin: function() {
      this.dataUser.isAdmin = !this.dataUser.isAdmin;
    },
    createUser: async function(e) {
      let pseudo = document.getElementById("nom").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let isAdmin = document.getElementById("admin").lastChild.checked;
      if (!pseudo || !email) {
        this.alerte = !this.alerte;
      } else {
        configAxios
          .post("user/register", {
            pseudo: pseudo,
            email: email,
            password: password,
            isAdmin: isAdmin,
          })
          .then(() => {
            configAxios.get("user").then((res) => {
              store.dispatch("getAllUsers", res.data);
              location.replace("/utilisateurs");
            });
          });
      }
      e.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & .overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  & .modale {
    background: #f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    top: 50%;
    width: 75%;
    border-radius: 10px;

    & .btn-modale {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    & div {
      width: 100%;
      margin: 5px auto;
      & label {
        text-align: left;
        width: 25%;
      }
      & input {
        width: 70%;
      }
    }
    & #admin {
      background: #fff;
      width: 75%;
    }
    & .btn-success {
      margin-top: 35px;
      border-radius: 5px;
    }
    & #buttons {
      margin: auto;
      & .btn-success,
      .btn-danger {
        border-radius: 5px;
        margin: 30px;
      }
    }
    & .alert {
      color: red;
      font-weight: bold;
    }
  }
}

@media screen and (min-width: 768px) {
  .bloc-modale {
    position: fixed;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & .modale {
      width: 50%;
    }
  }
}
</style>
