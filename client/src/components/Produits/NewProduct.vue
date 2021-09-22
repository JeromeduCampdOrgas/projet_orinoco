<template>
  <div>
    <h1>Créer un nouveau produit</h1>
    {{ this.categories }}
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
          <input type="text" name="name" id="name" v-model="dataProduct.name" />
          <div class="personnalisation">
            <select
              name="optionCategory"
              id="optionCategory"
              v-model="dataProduct.categorie"
              v-if="!ajout"
            >
              <option
                v-for="optionCategory in this.categories"
                :key="optionCategory"
                :value="optionCategory"
              >
                {{ optionCategory }}
              </option>
            </select>
            <input
              v-if="ajout"
              type="text"
              name="category"
              id="category"
              v-model="dataProduct.categorie"
            />
            <button class="buttonOption" v-if="!ajout" @click="clickAjout">
              +
            </button>
            <button class="buttonOption" v-if="ajout" @click="clickAjout">
              -
            </button>
          </div>
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
          <div class="personnalisation">
            <input type="text" name="colors" id="colors" />
            <button class="buttonOption">
              +
            </button>
          </div>
          <input
            type="text"
            name="stock"
            id="stock"
            v-model="dataProduct.stock"
          />
          <input type="file" name="image" id="image" @change="onFileChange" />
        </div>
      </div>
      <button class="new-product" @click="creer">créer</button>
      <button class="new-product" @click="retour">retour</button>
      <button @click="test">test</button>
    </form>
  </div>
</template>

<script>
import configAxios from "../../axios/configAxios";
import store from "../../store/index";
export default {
  data() {
    return {
      ajout: false,
      dataProduct: {
        name: null,
        categorie: null,
        description: null,
        price: null,
        imageUrl: null,
        stock: null,
        colors: [],
      },
      categories: this.$store.state.categories,
    };
  },
  methods: {
    clickAjout() {
      this.ajout = !this.ajout;
    },
    test() {
      console.log(this.dataProduct);
    },
    ajouterPersonnalisation() {
      console.log("recoucou");
    },
    retour() {
      this.$router.push({ path: "/AllProducts" });
    },
    onFileChange(event) {
      this.dataProduct.imageUrl = event.target.files[0];
    },
    creer() {
      //console.log(this.dataProduct.categorie);
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
          //on récupére tous les produits en base
          configAxios.get(`product`).then((res) => {
            //on met le store à jour
            store.dispatch("getProducts", res.data);

            //A VERIFIER QUE LA NOUVELLE CATEGORIE N4EXISTE PAS DEJA!!!!!!!!!!!!!!!!!!!!!!!!
            //on place la nouvelle catégorie dans le tableau en data this.categories

            this.categories.push(this.dataProduct.categorie);
            store.dispatch("getCategories", this.categories);
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
  & .personnalisation {
    display: flex;
  }
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
    justify-content: space-around;
    width: 30%;
    margin: 10px 0;
    text-align: left;

    & label,
    input {
      width: 150px;
      margin: 5px;
    }
    & select {
      width: 300px;
      background: grey;
    }

    & .buttonOption {
      margin-left: 10px;
      height: 22px;
    }
  }
}
.new-product {
  margin: 30px;
}
</style>
