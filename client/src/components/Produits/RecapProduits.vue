<template>
  <div>
    <h1>Récapitulatif</h1>

    <div v-for="item in this.$store.state.recap" :key="item">
      <p>{{ item.data[0].categorie }}</p>
      <table>
        <thead>
          <tr class="libelle">
            <td>Image</td>
            <td>Name</td>
            <td>Référence</td>
            <td>Description</td>
            <td>Stock</td>
            <td>Prix</td>
            <td>Options</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="elem in item.data" :key="elem">
            <td class="image">
              <img :src="elem.imageUrl" alt="" />
            </td>
            <td>{{ elem.name }}</td>
            <td>{{ elem._id }}</td>
            <td>{{ elem.description }}</td>
            <td>{{ elem.stock }}</td>
            <td>{{ elem.price }}</td>

            <td>
              <tr v-for="option in elem.colors" :key="option">
                {{
                  option
                }}
              </tr>
            </td>

            <td>
              <img
                class="icons"
                src="../../../public/img/edit.svg"
                alt="edit"
                title="Modifier"
                width="30"
                @click="edit"
              />
              <img
                class="icons"
                src="../../../public/img/trash.svg"
                alt="trash"
                title="Supprimer"
                width="30"
                @click="trash"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import configAxios from "../../axios/configAxios";
//import configAxios from "../../axios/configAxios";
export default {
  data() {
    return {
      categories: store.state.categories,
      products: store.state.products,
      recapProduits: store.state.recap,
      selectedProductId: "",
      selectedProduct: "",
    };
  },
  methods: {
    test: function(e) {
      console.log(e.target.parentNode.parentNode);
    },
    trash: function(e) {
      console.log(e.target.parentNode.parentNode.childNodes[2].innerHTML);
      let selectedProductId =
        e.target.parentNode.parentNode.childNodes[2].innerHTML;
      if (this.setNbProducts < 2) {
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i] === this.setSelectedProduct) {
            this.categories.splice(i, 1);
            store.dispatch("getCategories", this.categories);
          }
        }
      }
      configAxios.delete(`product/${selectedProductId}`).then(() =>
        configAxios.get(`product`).then((res) => {
          store.dispatch("getProducts", res.data);
        })
      );
      e.target.parentNode.parentNode.remove();
      this.$router.push("/AllProducts");
    },
    edit: function(e) {
      let selectedProductId =
        e.target.parentNode.parentNode.childNodes[2].innerHTML;
      //console.log(e.path[2].id);
      configAxios.get(`product/${selectedProductId}`).then((res) => {
        this.selectedProduct = res.data;
        console.log(res.data);
        store.dispatch("getModifProduit", this.selectedProduct);
        this.$router.push("/modification");
      });
    },
  },
};
</script>

<style lang="scss">
table {
  width: 100%;
}
table,
td {
  border: 1px black solid;
  border-collapse: collapse;
}
thead {
  background: linear-gradient(rgb(243, 233, 241), #9667da);
}
.image {
  width: 10%;
  & img {
    width: 100%;
  }
}
</style>
