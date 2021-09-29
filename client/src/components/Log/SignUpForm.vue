<template>
  <form action="" id="sign-up-form">
    <label for="pseudo">Pseudo</label>
    <input type="text" name="pseudo" id="pseudo" />
    <br />
    <label for="email">email</label>
    <input type="email" name="email" id="email" />
    <br />
    <label for="password">Mot de passe</label>
    <input type="password" name="password" id="password" />
    <br />
    <label for="confirm-password">Confirmation mot de passe</label>
    <input type="password" name="confirm-password" id="confirm-password" />
    <br />
    <input type="submit" value="Valider inscription" />
  </form>
</template>

<script>
export default {
  name: "SignUpForm",
};
</script>

<style lang="scss">
#sign-up-form {
  border: 1px black solid;
}
</style>
