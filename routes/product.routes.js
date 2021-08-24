const router = require("express").Router();
const productController = require("../controllers/product.controller");
const multer = require("multer");
const upload = multer();
const fs = require("fs");

///Obtenir toutes les catégories
router.get("/categories", productController.getAllCategories);
//tous les produits d'une catégorie
router.get("/:categorie", productController.getAllProductsCategorie);
//supprimer une catégorie
router.delete("/:categorie", productController.deleteOneProductsCategorie);
//modifier le nom d'une catégorie
router.put("/:categorie", productController.updateOneCategorie);

//routes
///Obtenir tous les produits
router.get("/", productController.getAllProducts);
///Obtenir 1 produit
router.get("/:id", productController.getOneProduct);
///update 1 produit
router.put("/:id", productController.updateOneProduct);
///delete 1 produit
router.delete("/:id", productController.deleteOneProduct);

///Créer un produit
router.post("/", upload.single("imageUrl"), productController.newProduct);

//commande
router.post("/order", productController.orderValidated);
module.exports = router;
