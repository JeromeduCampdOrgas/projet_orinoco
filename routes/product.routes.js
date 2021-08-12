const router = require("express").Router();
const productController = require("../controllers/product.controller");
const multer = require("multer");
const upload = multer();
const fs = require("fs");

//routes
///Obtenir tous les produits
router.get("/", productController.getAllProducts);
///Obtenir 1 produit
router.get("/:id", productController.getOneProduct);
///update 1 produit
router.put("/:id", productController.updateOneProduct);
///delete 1 produit
router.delete("/:id", productController.deleteOneProduct);
///Obtenir toutes les catégories
router.get("/categories", productController.getAllCategories);
///Créer un produit
router.post("/", upload.single("imageUrl"), productController.newProduct);

module.exports = router;
