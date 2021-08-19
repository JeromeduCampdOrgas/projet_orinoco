<template>
  <div>
    <div>produits</div>
    {{ this.state.userName }} : {{ userLoggedIn.isAdmin }}
    {{ categories }}
  </div>
</template>

<script>
import store from "../store/index";

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    userLoggedIn() {
      return store.state.userLoggedIn;
    },
    setUserName() {
      return this.$store.state.userName;
    },
  },
};
</script>

<style></style>
