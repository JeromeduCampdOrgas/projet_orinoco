import { createApp } from "vue";
import vuex from "vuex";
import store from "./store/index";

import App from "./App.vue";

createApp(App)
  .use(vuex)
  .use(store)
  .mount("#app");
