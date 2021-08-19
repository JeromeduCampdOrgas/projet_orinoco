import Vuex from "vuex";
import persistedState from "vuex-persistedstate";
import configAxios from "../axios/configAxios";

/*****State************************************************/
const state = {
  userLoggedIn: {},
  userName: "",
  categories: [],
};

/*****Getters**********************************************/
const getters = {
  getUserLoggedIn: () => {
    return state.userLoggedIn;
  },
  getUserName: () => {
    return state.userName;
  },
  getCategories: () => {
    return state.categories;
  },
};

/****Mutations**********************************************/
const mutations = {
  SET_USER_INFOS: (state, user) => {
    state.userLoggedIn = user;
  },
  SET_USERNAME: (state, name) => {
    state.userName = name;
  },
  SET_CATEGORIES: (state, categorie) => {
    state.categories = categorie;
  },
};

/****Actions************************************************/
const actions = {
  getUserInfos: ({ commit }, user) => {
    commit("SET_USER_INFOS", user);
  },
  getUserName: ({ commit }, name) => {
    commit("SET_USERNAME", name);
  },
  getCategories: (context) => {
    configAxios.get(`product/categories`).then((response) => {
      context.commit("SET_CATEGORIES", response.data);
    });
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
