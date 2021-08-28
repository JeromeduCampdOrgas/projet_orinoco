const router = require("express").Router();
const categorieController = require("../controllers/categorie.controller");

///Obtenir toutes les catégories
router.get("/", categorieController.getAllCategories);
//tous les produits d'une catégorie
router.get("/:categorie", categorieController.getAllProductsCategorie);
//supprimer une catégorie
router.delete("/:categorie", categorieController.deleteOneProductsCategorie);
//modifier le nom d'une catégorie
router.put("/:categorie", categorieController.updateOneCategorie);

module.exports = router;
