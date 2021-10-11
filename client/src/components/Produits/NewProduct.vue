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
          <div class="personnalisation" id="categorie">
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

            <button
              class="buttonOption ajoutSuppr"
              v-if="!ajout"
              @click="clickAjout"
            >
              +
            </button>
            <span v-if="categorieExiste">Cette catégorie existe déjà!</span>
            <button
              class="buttonOption ajoutSuppr"
              v-if="ajout"
              @click="clickAjout"
            >
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
                Autre option
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
                <button class="buttonOption ajoutSuppr" @click="deleteoption">
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
            <label for="image" id="labelImage">Image</label>
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
        <div class="alerte" v-if="colorExiste">
          <span><img src="../../../public/img/danger.png"/></span>
          <p>Cette option existe déjà</p>
        </div>
      </div>

      <button class="new-product" @click="creer">Valider</button>
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
    colorexiste: function(e) {
      this.colorsArray = [];
      this.colorExiste = false;
      console.log("1:colorExiste: " + this.colorExiste);
      let elements = document.getElementsByClassName("optionValue");
      for (let i = 0; i < elements.length - 1; i++) {
        let color = elements[i].value;
        this.colorsArray.push(color);
      }
      //console.log(e.target.value);
      const found = this.colorsArray.find(
        (element) => element == e.target.value
      );
      if (found) {
        this.colorExiste = !this.colorExiste;
      }
      console.log("2:colorExiste: " + this.colorExiste);
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
      suboption.addEventListener("blur", this.colorexiste);
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

    onFileChange(event) {
      this.dataProduct.imageUrl = event.target.files[0];
    },

    creer: function(e) {
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
        this.colorsArray = [];
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
  width: 100%;
  margin: auto;
  & .personnalisation {
    display: flex;
    margin-bottom: 10px;
  }
  & .info-produit {
    display: flex;
    justify-content: center;
    width: 95%;
    margin: auto;
  }
  & .infos {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 0;
    text-align: left;
    width: 95%;
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
      font-weight: bold;
    }
    & .ajoutSuppr {
      margin-left: 10px;
      width: 30px;
      height: 25px;
      vertical-align: middle;
      font-weight: bold;
      border-color: white;
      border-radius: 5px;
    }
    & .ajoutOption {
      background: lightgray;
      margin: 2px 0;
      padding: 5px;
      font-size: 0.9em;
      vertical-align: middle;
      width: 70%;
      height: 50px;
      margin-top: 10px;
      border-color: white;
      border-radius: 5px;
    }
    & .ajoutSuppr:hover,
    .ajoutOption:hover {
      background: lighten($color: lightgreen, $amount: 3);
    }
  }
  & label {
    font-weight: bold;
    width: 25%;
  }
  &.infos {
    width: 50%;
  }
}
.new-product {
  font-weight: bold;
  margin: 30px;
  width: 100px;
  height: 50px;
  border-color: white;
  border-radius: 5px;
}
.new-product:hover {
  background: linear-gradient(rgb(243, 233, 241), #9667da);
}
.icone {
  width: 18px;
  background: red;
}
.alerte {
  display: flex;
  flex-direction: column;
  margin: 15px;
  width: 30%;
  align-items: center;
  & p {
    margin: auto;
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
#packOptions,
#categorie {
  border: 1px black solid;
  background: #eee;
  padding: 10px;
  width: 95%;

  & .suboption {
    background: grey;
    & input {
      width: 75%;
    }
  }
}
#image {
  font-size: 0.8em;
  font-weight: bold;
}
#labelImage {
  width: 20%;
}

@media screen and(min-width: 768px) {
  .form-create {
    width: 50%;
    margin: auto;

    & .info-produit {
      width: 80%;
      margin: auto;
    }
  }
}
</style>
