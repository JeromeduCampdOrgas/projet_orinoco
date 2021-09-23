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
          <input
            type="text"
            name="name"
            id="name"
            v-model="dataProduct.name"
            @click="unvalableFocus"
          />

          <div class="personnalisation">
            <select
              name="optionCategory"
              id="optionCategory"
              v-model="dataProduct.categorie"
              v-if="!ajout"
              @click="unvalableFocus"
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
              @click="existeFocus"
            />
            <button class="buttonOption" v-if="!ajout" @click="clickAjout">
              +
            </button>
            <span v-if="alertAjout">Cette catégorie existe déjà!</span>
            <button class="buttonOption" v-if="ajout" @click="clickAjout">
              -
            </button>
          </div>

          <input
            type="text"
            name="description"
            id="description"
            v-model="dataProduct.description"
            @click="unvalableFocus"
          />

          <input
            type="text"
            name="price"
            id="price"
            v-model="dataProduct.price"
            @click="unvalableFocus"
          />

          <div class="personnalisation">
            <input type="text" name="colors" id="colors" @click="inputFocus" />
            <button class="buttonOption">
              +
            </button>
          </div>

          <input
            type="text"
            name="stock"
            id="stock"
            v-model="dataProduct.stock"
            @click="unvalableFocus"
          />

          <input
            type="file"
            name="image"
            id="image"
            @change="onFileChange"
            @click="unvalableFocus"
          />
        </div>
        <div class="alerte" v-if="unvalable">
          <span><img src="../../../public/img/danger.png"/></span>
          <p>- Un nom de produit est requis</p>
          <p>- Le choix d'une catégorie est requis</p>
          <p>- Une description du produit est requise</p>
          <p>- Un prix est requis</p>
          <p>- Un stock de produits est requis</p>
          <p>- Une photo du produit est requise</p>
        </div>
        <div class="alerte" v-if="existe">
          <span><img src="../../../public/img/danger.png"/></span>
          <p>- La catégorie {{ this.dataProduct.categorie }} existe déjà</p>
        </div>
      </div>

      <button class="new-product" @click="creer">créer</button>
      <button class="new-product" @click="retour">retour</button>
      <button class="new-product" @click="test">test</button>
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
      alertAjout: false,
      unvalable: false,
      existe: false,

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
    ajouterPersonnalisation() {
      console.log("recoucou");
    },
    retour() {
      this.$router.push({ path: "/AllProducts" });
    },
    onFileChange(event) {
      this.dataProduct.imageUrl = event.target.files[0];
    },
    test() {
      let nom = document.getElementById("name").value;

      console.log(nom);
    },
    creer(e) {
      let nom = document.getElementById("name").value;
      let categoryNew = document.getElementById("category").value;
      let description = document.getElementById("description").value;
      let prix = document.getElementById("price").value;
      let stock = document.getElementById("stock").value;
      let image = document.getElementById("image").value;
      if (this.ajout) {
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i] === this.dataProduct.categorie) {
            this.existe = !this.existe;
            e.preventDefault();
          }
        }
        if (
          (this.ajout && !nom) ||
          !categoryNew ||
          !description ||
          !prix ||
          !stock ||
          image
        ) {
          this.unvalable = !this.unvalable;
          e.preventDefault();
        }
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
      }
      //console.log(this.dataProduct.categorie);
    },
    unvalableFocus() {
      if (this.unvalable) {
        this.unvalable = !this.unvalable;
      }
    },
    existeFocus() {
      if (this.existe) {
        this.existe = !this.existe;
      }
    },
  },
  /*for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i] === this.dataProduct.categorie) {
            console.log(this.categories[i]);
            console.log("cette categorie existe déjà");
            this.alertAjout = !this.alertAjout;
            e.preventDefault();
          }
        }
      }*/
};
</script>

<style lang="scss">
.form-create {
  background: lightgrey;
  width: 70%;
  margin: auto;
  & .personnalisation {
    display: flex;
  }
  & .info-produit {
    display: flex;
    justify-content: center;
    width: 80%;
    margin: auto;
  }

  & .label,
  .infos {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 10px 0;
    text-align: left;
    & label,
    input {
      width: 150px;
      margin: 5px;
    }
    & select {
      margin-left: 5px;
      width: 150px;
      background: grey;
    }

    & .buttonOption {
      margin-left: 10px;
      height: 22px;
    }
  }
  & .label {
    width: 25%;
  }
  &.infos {
    width: 50%;
  }
}
.new-product {
  margin: 30px;
}
.icone {
  width: 18px;
  background: red;
}
.alerte {
  margin: 15px;
  width: 25%;
  align-items: center;
  & p {
    text-align: left;
    color: red;
    font-weight: bold;
    font-size: 0.8em;
  }

  & span {
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
    color: red;
    margin-left: 5px;
    & img {
      margin: auto;
      padding: 2px;
      background: red;
    }
  }
}
</style>
