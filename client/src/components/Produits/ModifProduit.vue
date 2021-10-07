<template>
  <div>
    <input type="button" value="Récapitulatif" @click="recap" />
    <h1>modif produit view</h1>
    <p>Référence: {{ productToModify._id }}</p>

    <div class="container-modify">
      <img :src="productToModify.imageUrl" alt="" />
    </div>

    <form class="form-modify">
      <div class="info-produit">
        <div class="infos">
          <div class="personnalisation">
            <label for="name">Nom du produit</label>
            <input
              type="text"
              name="name"
              id="name"
              :value="productToModify.name"
            />
          </div>
          <div class="personnalisation">
            <label for="category">Catégorie</label>
            <input
              type="text"
              name="category"
              id="category"
              :placeholder="productToModify.categorie"
            />
          </div>
          <div class="personnalisation">
            <label for="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              :value="productToModify.description"
            />
          </div>
          <div class="personnalisation">
            <label for="price">Prix</label>
            <input
              type="text"
              :value="productToModify.price"
              name="price"
              id="price"
            />
          </div>
          <div class="personnalisation" id="packOptions">
            <div id="options-commands">
              <label for="colors">Options</label>
              <div id="options">
                <button class="buttonOption ajoutOption" @click="optionsupp">
                  +
                </button>
              </div>
            </div>

            <div id="options-values">
              <div class="options" v-for="color in this.colors" :key="color">
                <div class="suboption">
                  <input
                    type="text"
                    :value="color"
                    class="optionValue"
                    @click="existeFocus"
                    @blur="verifOption"
                  />
                  <button class="buttonOption" @click="deleteoption">
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="personnalisation">
            <label for="stock">Stock</label>
            <input
              type="text"
              :value="productToModify.stock"
              name="stock"
              id="stock"
              @blur="changeStock"
            />
          </div>
        </div>
        <div class="alerte" v-if="colorExiste">
          <span><img src="../../../public/img/danger.png"/></span>
          <p>L'option {{ colorModifiee }} existe déjà</p>
        </div>
      </div>

      <button class="new-product" @click="modifValidation">
        Valider les modifications
      </button>
      <button class="new-product" @click="retour">Retour</button>
      <button class="new-product" @click="testCouleur">couleur</button>
    </form>
  </div>
</template>

<script>
import store from "../../store/index";
import configAxios from "../../axios/configAxios";

export default {
  name: "ModifProduit",
  data() {
    return {
      ajout: this.$store.state.ajout,
      productToModify: this.$store.state.modifProduit,
      colors: this.$store.state.modifProduit.colors,
      colorExiste: false,
      unvalable: false,
      categorie: this.$store.state.selectedCategorie,
      colorsArray: [],
      colorsModif: "",
      colorModifiee: "",
      selectedProduct: "",
      dataProduct: {
        id: null,
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
    changeStock(e) {
      this.dataProduct.stock = e.target.value;
    },

    testCouleur: function() {
      let imageUrl = document.getElementsByTagName("img").src;
      console.log(imageUrl);
    },
    modifValidation: function(e) {
      let id = this.$store.state.modifProduit._id;
      let categorie = this.$store.state.modifProduit.categorie;
      //accès au dom
      let name = document.getElementById("name").value;
      let description = document.getElementById("description").value;
      let price = document.getElementById("price").value;
      let stock = document.getElementById("stock").value;
      let elements = document.getElementsByClassName("optionValue");
      const found = this.colorsArray.find(
        (element) => element == e.target.value
      );
      if (found) {
        this.colorExiste = !this.colorExiste;
        e.preventDefault();
      } else {
        this.colorsArray = [];
        for (let i = 0; i < elements.length; i++) {
          let color = elements[i].value;
          this.colorsArray.push(color);
          this.dataProduct.colors.push(elements[i].value);
        }
        e.preventDefault();
      }
      /************************************ */
      let colors = this.colorsArray;
      configAxios
        .put("/product/" + id, {
          name: name,
          description: description,
          price: price,
          stock: stock,
          colors: colors,
        })
        .then(() => {
          let selectedProductId = id;
          configAxios
            .get(`product/${selectedProductId}`)
            .then((res) => {
              this.selectedProduct = res.data;
              console.log(res.data);
              store.dispatch("getModifProduit", this.selectedProduct);
            })
            .then(() => {
              configAxios.get(`product`).then((res) => {
                //on met le store à jour
                store.dispatch("getProducts", res.data);
              });
            });
          configAxios.get(`categories/${categorie}`).then((res) => {
            store.dispatch("getPageProduits", res.data);
            store.dispatch("getSelectedCategorie", categorie);
            this.$router.push(categorie);
            return store.state.selectedCategorie;
          });
        });

      this.$router.push(this.categorie);
    },
    retour() {
      this.$router.push({ path: "/AllProducts" });
    },
    recap() {
      this.$router.push("/recapitulatif");
    },
    colorexiste: function(e) {
      this.colorsArray = [];
      this.colorExiste = false;
      let elements = document.getElementsByClassName("optionValue");
      for (let i = 0; i < elements.length - 1; i++) {
        let color = elements[i].value;
        this.colorsArray.push(color);
      }

      const found = this.colorsArray.find(
        (element) => element == e.target.value
      );
      if (found) {
        this.colorExiste = !this.colorExiste;
      }
      e.preventDefault();
    },
    optionsupp: function(e) {
      let toutesOptions = document.getElementsByClassName("suboption");
      if (toutesOptions.length == 0) {
        this.creationElement();
        console.log(toutesOptions.length);
        e.preventDefault();
      } else {
        for (let i = 0; i < toutesOptions.length; i++) {
          if (toutesOptions[i].childNodes[0].value === "") {
            console.log("mais euh!");
            this.colorOk = false;
          } else {
            this.colorOk = true;
            e.preventDefault();
          }
        }
      }
      if (this.colorOk == true) {
        this.creationElement();
        e.preventDefault();
      }
    },
    deleteoption: function(e) {
      let color = e.target.previousElementSibling.value;
      let categorie = this.$store.state.modifProduit.categorie;
      this.colorsArray = this.$store.state.modifProduit.colors;
      console.log(this.colorsArray);
      const index = this.colorsArray.indexOf(color);
      if (index > -1) {
        this.colorsArray.splice(index, 1);
        let elemParent = e.target.parentElement.parentElement;
        elemParent.remove();
        this.colorExiste = false;
      }
      /****************************************** */
      this.dataProduct.id = this.$store.state.modifProduit._id;

      this.dataProduct.categorie = this.$store.state.modifProduit.categorie;
      this.dataProduct.name = document.getElementById("name").value;
      this.dataProduct.description = document.getElementById(
        "description"
      ).value;
      this.dataProduct.price = document.getElementById("price").value;
      this.dataProduct.stock = document.getElementById("stock").value;
      this.dataProduct.imageUrl = this.$store.state.modifProduit.imageUrl;
      this.dataProduct.colors = this.colorsArray;

      store.dispatch("getModifProduit", this.dataProduct);
      configAxios
        .put("/product/" + this.dataProduct.id, {
          name: this.dataProduct.name,
          price: this.dataProduct.price,
          stock: this.dataProduct.stock,
          colors: this.dataProduct.colors,
        })
        /********************************************** */
        .then(() => {
          configAxios.get(`product`).then((res) => {
            //on met le store à jour
            store.dispatch("getProducts", res.data);
          });
        })
        .then(() => {
          configAxios.get(`categories/${categorie}`).then((res) => {
            console.log(res.data);
            store.dispatch("getPageProduits", res.data);
            store.dispatch("getSelectedCategorie", categorie);
          });
        });
    },
    creationElement() {
      /************************************************************* */
      //CREATION ELEMENTS
      //div:id= options-values
      let option = document.getElementById("options-values");
      //div:class = options
      let optionsup = document.createElement("div");
      //div:class=suboption
      let suboption = document.createElement("div");
      //input: class=suboption-value
      let suboptionvalue = document.createElement("input");
      //button: suppression option
      let boutonAjout = document.createElement("button");
      /************************************************************ */
      //ATTRIBUTS DES ELEMENTS
      optionsup.setAttribute("class", "options");
      suboption.setAttribute("class", "suboption");
      suboptionvalue.addEventListener("blur", this.colorexiste);
      suboptionvalue.addEventListener("click", this.existeFocus);
      suboptionvalue.setAttribute("class", "optionValue");
      suboptionvalue.setAttribute("type", "text");
      suboptionvalue.setAttribute("name", "colors");

      boutonAjout.innerHTML = "-";
      boutonAjout.setAttribute("class", "buttonOption");
      boutonAjout.addEventListener("click", function(e) {
        let elemParent = e.target.parentElement;
        console.log(this.colorExiste);
        if (this.colorExiste) {
          console.log("Hey!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          this.colorExiste = !this.colorExiste;
        }
        elemParent.remove();
        e.preventDefault();
      });
      option.appendChild(optionsup);
      optionsup.appendChild(suboption);
      suboption.appendChild(suboptionvalue);
      suboption.appendChild(boutonAjout);
    },
    verifOption(e) {
      this.colorsArray = this.$store.state.modifProduit.colors;
      this.colorModifiee = e.target.value;
      if (e.target.value != this.colorsModif) {
        for (let i = 0; i < this.colorsArray.length; i++) {
          if (this.colorsModif == this.colorsArray[i]) {
            this.colorExiste = true;
            e.preventDefault();
          }
        }
      }
    },
    existeFocus(e) {
      this.colorsModif = e.target.value;
      if (this.colorExiste) {
        this.colorExiste = !this.colorExiste;
      }
    },
  },

  beforeMount() {
    //console.log(this.colors);
    return store.state.modifProduit;
  },
  computed: {},
};
</script>

<style lang="scss">
.container-modify {
  & img {
    height: 200px;
    width: 200px;
  }
}
.form-modify {
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
  }
  .new-product {
    margin: 30px;
  }
  & #packOptions {
    display: flex;
    justify-content: space-around;
    margin: 10px;
    border: 1px black solid;
    background: #eee;
    padding-top: 5px;

    & #options-commands {
      display: flex;
      justify-content: space-between;
    }
  }

  & .suboption {
    margin: auto;
    margin-bottom: 0;
  }
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
</style>
