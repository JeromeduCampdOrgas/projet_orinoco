<template>
  <div>
    <div id="banniere">
      <img src="./assets/logo-resize.jpg" alt="logo orinoco" id="logo" />
    </div>
    <div v-if="!token">
      <SignInForm />
    </div>
    <div v-if="token">
      <AllProducts />
    </div>
  </div>
</template>

<script>
import SignInForm from "./components/Log/SignInForm.vue";
import AllProducts from "./views/AllProducts.vue";

export default {
  name: "App",
  components: {
    SignInForm,
    AllProducts,
  },
  data() {
    return {
      renderComponent: true,
      token: localStorage.getItem("token"),
      chemin: window.location.pathname,
    };
  },
  methods: {
    forceRerender() {
      // Remove my-component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
  },
};
</script>

<style lang="scss">
#banniere {
  width: 100%;
  text-align: center;
}
</style>
