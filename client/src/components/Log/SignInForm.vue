<template>
  <form action="" id="sign-in-form">
    <label for="email">email</label>
    <input type="email" name="email" id="email" />
    <br />
    <label for="password">Mot de passe</label>
    <input type="password" name="password" id="password" />
    <br />
    <input type="submit" value="Se connecter" />
  </form>
</template>

<script>
export default {
  name: "SignInForm",
};
</script>

<style lang="scss">
#sign-in-form {
  border: 1px black solid;
}
</style>
