import configAxios from "../../axios/configAxios";
import store from "../../store/index";

module.exports.getCategories = () => {
  configAxios
    .get(`product/categories`)
    .then((res) => store.dispatch("getCategories", res))
    .catch((err) => err);
};
