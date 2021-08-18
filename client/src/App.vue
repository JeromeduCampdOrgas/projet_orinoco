<template>
  <div>
    <div id="banniere">
      <img src="./assets/logo-resize.jpg" alt="logo orinoco" id="logo" />
    </div>
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

<style lang="scss">
#banniere {
  width: 100%;
  text-align: center;
}
</style>
