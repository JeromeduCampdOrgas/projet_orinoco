import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next({ name: "AllProducts" }) : next();
    },
  },
  {
    path: "/allProducts",
    name: "AllProducts",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/AllProducts.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Login" });
    },
  },
  {
    path: "/:categorie",
    component: () =>
      import(
        /* webpackChunkName: "login" */ "../components/Produits/PageProduits.vue"
      ),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Login" });
    },
  },
  {
    path: "/modification",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/ModifProduit.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Login" });
    },
  },
  {
    path: "/creation",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/FormProduct.vue"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Login" });
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
