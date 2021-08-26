import { createApp } from "vue";
import vuex from "vuex";
import store from "./store/index";
//import AllProducts from "./views/AllProducts.vue";
//import PageProduits from "./components/Produits/PageProduits.vue";

import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router)
  .use(vuex)
  .use(store)
  .mount("#app");
