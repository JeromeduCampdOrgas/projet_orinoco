import Vuex from "vuex";
import persistedState from "vuex-persistedstate";

/*****State************************************************/
const state = {
  userLoggedIn: {},
  userName: "",
  categories: [],
  products: [],
  accueil: [],
  pageProduits: [],
  selectedCategorie: "",
  userLogged: false,
  modifProduit: "",
  ajout: false,
};

/*****Getters**********************************************/
const getters = {
  getUserLogged: () => {
    return state.userLogged;
  },
  getUserLoggedIn: () => {
    return state.userLoggedIn;
  },
  getUserName: () => {
    return state.userName;
  },
  getCategories: () => {
    return state.categories;
  },
  getProducts: () => {
    return state.products;
  },

  getFirstPage: () => {
    return state.accueil;
  },
  getPageProduits: () => {
    return state.pageProduits;
  },
  getSelectedCategorie: () => {
    return state.selectedCategorie;
  },
  getModifProduit: () => {
    return state.modifProduit;
  },
  getModifAjout: () => {
    return state.ajout;
  },
};

/****Mutations**********************************************/
const mutations = {
  SET_USER_LOGGED: (state, logged) => {
    state.userLogged = logged;
  },
  SET_USER_INFOS: (state, user) => {
    state.userLoggedIn = user;
  },
  SET_USERNAME: (state, name) => {
    state.userName = name;
  },
  SET_CATEGORIES: (state, categorie) => {
    state.categories = categorie;
  },
  SET_PRODUCTS: (state, product) => {
    state.products = product;
  },
  SET_FIRSTPAGE: (state, accueil) => {
    state.accueil = accueil;
  },
  SET_PAGE_PRODUITS: (state, produits) => {
    state.pageProduits = produits;
  },
  SET_SELECTED_CATEGORIE: (state, selected) => {
    state.selectedCategorie = selected;
  },
  SET_MODIF_PRODUIT: (state, produit) => {
    state.modifProduit = produit;
  },
  SET_AJOUT: (state, ajout) => {
    state.ajout = ajout;
  },
};

/****Actions************************************************/
const actions = {
  //LoggedIn?
  getUserLogged: ({ commit }, logged) => {
    commit("SET_USER_LOGGED", logged);
  },
  //id,idAdmin
  getUserInfos: ({ commit }, user) => {
    commit("SET_USER_INFOS", user);
  },
  //username
  getUserName: ({ commit }, name) => {
    commit("SET_USERNAME", name);
  },
  //getAllCategories
  getCategories: ({ commit }, categories) => {
    commit("SET_CATEGORIES", categories);
  },
  //getAllproducts
  getProducts: ({ commit }, products) => {
    commit("SET_PRODUCTS", products);
  },
  //getOneProductPerPage
  getFirstPage: ({ commit }, firstPage) => {
    commit("SET_FIRSTPAGE", firstPage);
  },
  //getProductsOfCategorieSelected
  getPageProduits: ({ commit }, produits) => {
    commit("SET_PAGE_PRODUITS", produits);
  },
  getSelectedCategorie: ({ commit }, selected) => {
    commit("SET_SELECTED_CATEGORIE", selected);
  },
  getModifProduit: ({ commit }, produit) => {
    commit("SET_MODIF_PRODUIT", produit);
  },
  //implique le choix du formulaire à afficher en fonction d'une catégorie existante ou non
  getModifAjout: ({ commit }, ajout) => {
    commit("SET_AJOUT", ajout);
  },
};

export default new Vuex.Store({
  plugins: [persistedState()],
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
