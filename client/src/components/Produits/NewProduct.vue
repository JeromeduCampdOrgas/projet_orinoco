<template>
  <div>
    <h1>Créer un nouveau produit</h1>

    <form class="form-create" id="myform">
      <div class="info-produit">
        <!-------------------------------------->
        <div class="label">
          <label for="name">Nom du produit</label>
          <label for="category">Catégorie</label>
          <label for="description">Description</label>
          <label for="price">Prix</label><label for="colors">Options</label>
          <label for="stock">Stock</label>
          <label for="image">Image</label>
        </div>
        <!-------------------------------------->
        <div class="infos">
          <input
            type="text"
            name="category"
            id="category"
            v-model="dataProduct.categorie"
          /><input
            type="text"
            name="name"
            id="name"
            v-model="dataProduct.name"
          />
          <input
            type="text"
            name="description"
            id="description"
            v-model="dataProduct.description"
          />
          <input
            type="text"
            name="price"
            id="price"
            v-model="dataProduct.price"
          />
          <div id="personnalisation">
            <input type="text" name="colors" id="colors" />
            <input type="button" @click="ajouterPersonnalisation" value="+" />
            <input
              type="text"
              name="stock"
              id="stock"
              v-model="dataProduct.stock"
            />
            <input type="file" name="image" id="image" @change="onFileChange" />
          </div>
        </div>
      </div>
      <button class="new-product" @click="creer">créer</button>
      <button class="new-product" @click="retour">retour</button>
    </form>
  </div>
</template>

<script>
import configAxios from "../../axios/configAxios";
import store from "../../store/index";
export default {
  data() {
    return {
      dataProduct: {
        name: null,
        categorie: null,
        description: null,
        price: null,
        imageUrl: null,
        stock: null,
        colors: [],
      },
    };
  },
  methods: {
    ajouterPersonnalisation() {
      console.log("recoucou");
    },
    retour() {
      this.$router.push("/AllProducts");
    },
    onFileChange(event) {
      this.dataProduct.imageUrl = event.target.files[0];
    },
    creer() {
      const newProduct = new FormData();
      newProduct.set("name", this.dataProduct.name);
      newProduct.set("categorie", this.dataProduct.categorie);
      newProduct.set("description", this.dataProduct.description);
      newProduct.set("price", this.dataProduct.price);
      newProduct.set("colors", this.dataProduct.colors);
      newProduct.set("stock", this.dataProduct.stock);
      newProduct.set("imageUrl", this.dataProduct.imageUrl);
      //on crée le produit
      configAxios
        .post("/product", newProduct)
        .then(() =>
          configAxios.get(`product`).then((res) => {
            store.dispatch("getProducts", res.data);
            this.$router.push("/creation");
          })
        )
        .catch((err) => err);
    },
  },
};
</script>

<style lang="scss">
.form-create {
  background: lightgrey;
  width: 60%;
  margin: auto;
  & .info-produit {
    display: flex;
    justify-content: center;
    width: 70%;
    margin: auto;
  }

  & .label,
  .infos {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: 10px 0;
    text-align: left;
    & label,
    input {
      margin-bottom: 10px;
    }
  }
}

.new-product {
  margin: 30px;
}
</style>
