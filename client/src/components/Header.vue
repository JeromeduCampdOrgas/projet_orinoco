<template>
  <header>
    <div id="banniere">
      <img src="../assets/logo-resize.jpg" alt="logo orinoco" id="logo" />
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss">
header {
  margin: auto;
  max-width: 80%;
  height: 400px;
  & img {
    width: 100%;
    height: 400px;
  }
}
</style>
