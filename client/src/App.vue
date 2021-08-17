<template>
  <div>
    <img src="./assets/logo-resize.jpg" alt="logo orinoco" id="logo" />
    <SignInForm />
  </div>
</template>

<script>
import SignInForm from "./components/Log/SignInForm.vue";

export default {
  name: "App",
  components: {
    SignInForm,
  },
};
</script>

<style lang="scss"></style>
