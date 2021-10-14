<template>
  <div class="bloc-modale" v-if="updateRevele">
    <div class="overlay" @click="toggleUpdate"></div>

    <div class="modale ">
      <div class="btn-modale btn btn-danger" @click="toggleUpdate">X</div>
      <h2>Modifier utilisateur</h2>
      {{ this.userAdmin }}
      <form id="updateForm" action="">
        <div id="nom">
          <label for="name">Pseudo</label>
          <input type="text" :value="this.$store.state.user.pseudo" />
        </div>
        <div id="email">
          <label for="email">Email</label>
          <input
            name="email"
            type="email"
            :value="this.$store.state.user.email"
          />
        </div>

        <div id="admin">
          <label for="isAdmin">Admin</label>
          <input
            type="checkbox"
            @click="admin"
            :checked="false"
            v-if="!this.$store.state.user.isAdmin"
          />
          <input
            type="checkbox"
            @click="admin"
            :checked="true"
            v-if="this.$store.state.user.isAdmin"
          />
        </div>
        <div>
          <p class="alert" v-if="alerte">
            >Un pseudo et un email sont requis
          </p>
          <div id="buttons">
            <button class="btn-success" @click="updateUser">Valider</button>
            <button class="btn-danger" @click="toggleUpdate">
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
  name: "updateModale",
  props: ["updateRevele", "toggleUpdate", "userAdmin"],
  data() {
    return {
      dataUser: {
        pseudo: "",
        email: "",
        isAdmin: this.userAdmin,
      },
      alerte: false,
      users: this.$store.state.users,
    };
  },
  methods: {
    test(e) {
      console.log("dataUser: " + this.dataUser.isAdmin);

      e.preventDefault();
    },
    erreur: function() {
      if (this.alerte) {
        this.alerte = false;
      }
    },
    admin: function() {
      this.dataUser.isAdmin = !this.dataUser.isAdmin;
    },
    updateUser: async function(e) {
      let pseudo = document.getElementById("nom").lastChild.value;
      console.log(pseudo);
      let email = document.getElementById("email").lastChild.value;
      let isAdmin = this.dataUser.isAdmin;
      if (!pseudo || !email) {
        this.alerte = !this.alerte;
      } else {
        configAxios
          .put(`/user/${store.state.user._id}`, {
            pseudo: pseudo,
            email: email,
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
