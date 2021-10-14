<template>
  <div>
    <div class="title">
      <input type="button" value="Créer un user" @click="toggleModale" />
      <h1>Utilisateurs</h1>
      <modale
        v-bind:revele="revele"
        v-bind:toggleModale="toggleModale"
      ></modale>
      <updateModale
        v-bind:updateRevele="updateRevele"
        v-bind:toggleUpdate="toggleUpdate"
        v-bind:userAdmin="userAdmin"
      ></updateModale>
    </div>
    <table>
      <thead>
        <tr>
          <td>Pseudo</td>
          <td>Id</td>
          <td>Email</td>
          <td>Admin</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tr v-for="user in this.$store.state.users" :key="user">
        <td>{{ user.pseudo }}</td>
        <td>{{ user._id }}</td>
        <td>{{ user.email }}</td>
        <td>
          {{ user.isAdmin }}
        </td>
        <td>
          <img
            class="icons"
            src="../../../public/img/edit.svg"
            alt="edit"
            title="Modifier"
            width="30"
            @click="toggleUpdate"
          />
          <img
            class="icons"
            src="../../../public/img/trash.svg"
            alt="trash"
            title="Supprimer"
            width="30"
            @click="trash"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import configAxios from "../../axios/configAxios";
import store from "../../store/index";
import Modale from "./CreateUser.vue";
import updateModale from "./UpdateUser.vue";
export default {
  name: "Users",
  components: {
    modale: Modale,
    updateModale: updateModale,
  },
  data() {
    return {
      usersArray: store.state.users,
      revele: false,
      updateRevele: false,
      userAdmin: false,
    };
  },
  methods: {
    toggleModale: function() {
      this.revele = !this.revele;
    },
    toggleUpdate: function(e) {
      let userToUpdate = e.target.parentNode.parentNode.childNodes[1].innerHTML;

      configAxios.get(`user/${userToUpdate}`).then((res) => {
        if (res.data.isAdmin) {
          this.userAdmin = !this.userAdmin;
        }
        console.log(this.userAdmin);
        store.dispatch("getOneUser", res.data);

        this.updateRevele = !this.updateRevele;
      });
    },
    trash: function(e) {
      let userToDelete = e.target.parentNode.parentNode.childNodes[1].innerHTML;
      configAxios.delete(`user/${userToDelete}`).then(() => {
        configAxios.get("user").then((res) => {
          store.dispatch("getAllUsers", res.data);
          location.replace("/utilisateurs");
        });
      });
    },
  },
};
</script>

<style lang="scss">
/****Nom de page */
.title {
  display: flex;
  margin-bottom: 20px;
  & h1 {
    width: 80%;
  }
}
/*******Tableau récap */
table {
  width: 100%;
}
table,
td {
  border: 1px black solid;
  border-collapse: collapse;
}
thead {
  width: 100%;
  background: linear-gradient(rgb(243, 233, 241), #9667da);
}
</style>
