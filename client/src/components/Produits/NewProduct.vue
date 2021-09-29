<template>
  <div>
    <h1>Créer un nouveau produit</h1>
    <form class="form-create" id="myform">
      <div class="info-produit">
        <div class="infos">
          <div class="personnalisation">
            <label for="name">Nom du produit</label>
            <input
              type="text"
              name="name"
              id="name"
              v-model="dataProduct.name"
              @focus="unvalableFocus"
            />
          </div>
          <div class="personnalisation">
            <label for="category">Catégorie</label>
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
              </option> </select
            ><input
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
            <span v-if="categorieExiste">Cette catégorie existe déjà!</span>
            <button class="buttonOption" v-if="ajout" @click="clickAjout">
              -
            </button>
          </div>
          <div class="personnalisation">
            <label for="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              v-model="dataProduct.description"
              @click="unvalableFocus"
            />
          </div>
          <div class="personnalisation">
            <label for="price">Prix</label>
            <input
              type="text"
              name="price"
              id="price"
              v-model="dataProduct.price"
              @click="unvalableFocus"
            />
          </div>

          <div class="personnalisation" id="packOptions">
            <div>
              <div>
                <label for="colors">Options</label>
              </div>
              <button class="buttonOption ajoutOption" @click="optionsupp">
                Ajouter une option
              </button>
            </div>
            <div id="options">
              <!--v-model="dataProduct.colors"-->
              <div class="suboption">
                <input
                  class="optionValue"
                  type="text"
                  name="colors"
                  id="colors"
                  @click="inputFocus"
                />
                <button class="buttonOption" @click="deleteoption">
                  -
                </button>
              </div>
            </div>
          </div>
          <div class="personnalisation">
            <label for="stock">Stock</label>
            <input
              type="text"
              name="stock"
              id="stock"
              v-model="dataProduct.stock"
              @click="unvalableFocus"
            />
          </div>
          <div class="personnalisation">
            <label for="image">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              @change="onFileChange"
              @click="unvalableFocus"
            />
          </div>
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
//import axios from "axios";

export default {
  data() {
    return {
      ajout: this.$store.state.ajout,
      alertAjout: false,
      unvalable: false,
      colorOk: false,
      creationOk: false,
      categorieExiste: false,
      colorsArray: [],
      colorExiste: false,

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
    test: function(e) {
      //accès au dom
      let nom = document.getElementById("name").value;
      let description = document.getElementById("description").value;
      let prix = document.getElementById("price").value;
      let stock = document.getElementById("stock").value;
      let image = document.getElementById("image").value;
      //accès catégorie
      //1°partie, on est dans le mode ajoutr de catégorie
      if (this.ajout) {
        let category = document.getElementById("category");
        //si est vide
        if (!category) {
          this.unvalable = !this.unvalable;
          //si la catégorie existe déjà
        } else {
          for (let i = 0; i < this.categories.length; i++) {
            //console.log(category.value);
            if (this.categories[i] == category.value) {
              this.categorieExiste = !this.categorieExiste;
            }
          }
        }
      } else {
        let category = document.getElementById("optionCategory");
        if (!category) {
          this.unvalable = !this.unvalable;
        }
      }
      if (!nom || !description || !prix || !stock || !image) {
        this.unvalable = !this.unvalable;
        e.preventDefault();
      } else {
        this.unvalable = false;
        this.categorieExiste = false;
        //recherche des valeurs des options
        let elements = document.getElementsByClassName("optionValue");
        for (let i = 0; i < elements.length; i++) {
          let color = elements[i].value;
          this.colorsArray.push(color);
          this.dataProduct.colors.push(elements[i].value);
        }
        const newProduct = new FormData();
        newProduct.set("name", this.dataProduct.name);
        newProduct.set("categorie", this.dataProduct.categorie);
        newProduct.set("description", this.dataProduct.description);
        newProduct.set("price", this.dataProduct.price);
        /*********************************************************************** */
        //on crée 1 à 1 les éléménts de data à poster pour que Axios sache quoi faire

        for (let i = 0; i < this.colorsArray.length; i++) {
          newProduct.set("colors[" + i + "]", this.colorsArray[i]);
        }

        /*********************************************************************** */
        newProduct.set("stock", this.dataProduct.stock);
        newProduct.set("imageUrl", this.dataProduct.imageUrl);

        //requête Axios
        configAxios.post("/product", newProduct).then(() =>
          //on récupére tous les produits en base
          configAxios.get(`product`).then((res) => {
            //on met le store à jour
            store.dispatch("getProducts", res.data);
            if (this.ajout) {
              this.categories.push(this.dataProduct.categorie);
              store.dispatch("getCategories", this.categories);
            }
            this.$router.push("/creation");
          })
        );
      }

      e.preventDefault();
    },
    deleteoption(e) {
      let elemParent = e.target.parentElement;
      elemParent.remove();
      e.preventDefault();
    },
    clickAjout() {
      this.ajout = !this.ajout;
      this.unvalable = false;
      store.dispatch("getModifAjout", this.ajout);
    },
    optionsupp: function(e) {
      let toutesOptions = document.getElementsByClassName("suboption");
      for (let i = 0; i < toutesOptions.length; i++) {
        if (toutesOptions[i].childNodes[0].value === "") {
          console.log("mais euh!");
          this.colorOk = false;
        } else {
          this.colorOk = true;
          e.preventDefault();
        }
      }
      if (this.colorOk == true) {
        this.creationElement();
        e.preventDefault();
      }
    },
    creationElement() {
      let option = document.getElementById("options");
      let optionsup = document.createElement("div");
      let suboption = document.createElement("input");
      let boutonAjout = document.createElement("button");
      suboption.setAttribute("class", "optionValue");
      optionsup.setAttribute("class", "suboption");
      suboption.setAttribute("type", "text");
      suboption.setAttribute("name", "colors");
      boutonAjout.innerHTML = "-";
      boutonAjout.setAttribute("class", "buttonOption");
      boutonAjout.addEventListener("click", function(e) {
        let elemParent = e.target.parentElement;
        elemParent.remove();
        e.preventDefault();
      });
      option.appendChild(optionsup);
      optionsup.appendChild(suboption);
      optionsup.appendChild(boutonAjout);
    },

    retour() {
      this.$router.push({ path: "/AllProducts" });
    },
    onFileChange(event) {
      this.dataProduct.imageUrl = event.target.files[0];
    },

    creer(e) {
      let nom = document.getElementById("name").value;
      let description = document.getElementById("description").value;
      let prix = document.getElementById("price").value;
      let stock = document.getElementById("stock").value;
      let image = document.getElementById("image").value;
      if (this.ajout) {
        let category = document.getElementById("category").value;
        if (!nom || !category || !description || !prix || !stock || !image) {
          this.unvalable = !this.unvalable;
          e.preventDefault();
        } else {
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i] === category) {
              console.log("categorie existante");
              this.categorieExiste = !this.categorieExiste;
              this.creationOk = false;
              e.preventDefault();
            }
          }

          this.unvalable = false;
          this.categorieExiste = false;

          e.preventDefault();
          let elements = document.getElementsByClassName("optionValue");

          for (let i = 0; i < elements.length; i++) {
            console.log(elements[i].value);
            //localStorage.setItem("colors", elements[i].value);
            this.dataProduct.colors.push(elements[i].value);
          }
          console.log(this.dataProduct.colors);
          e.preventDefault();
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
                //A VERIFIER QUE LA NOUVELLE CATEGORIE N'EXISTE PAS DEJA!!!!!!!!!!!!!!!!!!!!!!!!
                //on place la nouvelle catégorie dans le tableau en data this.categories
                this.categories.push(this.dataProduct.categorie);
                store.dispatch("getCategories", this.categories);
                this.$router.push("/creation");
              })
            )
            .catch((err) => err);
        }
        //console.log(this.dataProduct.categorie);
      } else {
        let category = document.getElementById("optionCategory").value;
        if (!nom || !category || !description || !prix || !stock || !image) {
          this.unvalable = !this.unvalable;
          console.log(this.unvalable);
          e.preventDefault();
        } else {
          this.unvalable = false;
          this.categorieExiste = false;

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
                //A VERIFIER QUE LA NOUVELLE CATEGORIE N'EXISTE PAS DEJA!!!!!!!!!!!!!!!!!!!!!!!!
                //on place la nouvelle catégorie dans le tableau en data this.categories
                store.dispatch("getCategories", this.categories);
                this.$router.push("/creation");
              })
            )
            .catch((err) => err);
        }
      }
    },
    unvalableFocus() {
      if (this.unvalable) {
        this.unvalable = !this.unvalable;
      }
    },
    existeFocus() {
      if (this.categorieExiste) {
        this.categorieExiste = !this.categorieExiste;
      }
      if (this.unvalable) {
        this.unvalable = !this.unvalable;
      }
    },
  },
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

  & .infos {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 0;
    text-align: left;
    width: 85%;
    & label {
      width: 45%;
    }
    & input {
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: 5px;
      margin-right: 5px;
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
    & .ajoutOption {
      background: green;
      margin: 2px 0;
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
  & #options {
    border: 1px black solid;
    display: flex;
    flex-direction: column;
  }
}
#packOptions {
  border: 1px black solid;
  background: #eee;
  padding-top: 5px;
}
</style>
