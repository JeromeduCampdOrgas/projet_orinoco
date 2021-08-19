import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";

import AllProducts from "../views/AllProducts.vue";

const routes = [
  {
    path: "/Login",
    name: "login",
    component: Login,
  },
  {
    path: "/AllProducts",
    name: "AllProducts",
    component: AllProducts,
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Home" });
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
