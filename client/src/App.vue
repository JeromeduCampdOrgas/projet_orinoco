<template>
  <div>
    <img src="./assets/logo-resize.jpg" alt="logo orinoco" />
    <SignUpForm msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import SignUpForm from "./components/SignUpForm.vue";

export default {
  name: "App",
  components: {
    SignUpForm,
  },
};
</script>

<style></style>
