const router = require("express").Router();
const productController = require("../controllers/product.controller");
const multer = require("multer");
const upload = multer();
const fs = require("fs");

///Obtenir toutes les catégories

///Obtenir tous les produits/
router.get("/", productController.getAllProducts);
//Obtenir 1 produit
router.get("/:id", productController.getProduct);
///update 1 produit
router.put("/:id", productController.updateOneProduct);
///delete 1 produit
router.delete("/:id", productController.deleteOneProduct);

///Créer un produit
router.post("/", upload.single("imageUrl"), productController.newProduct);

//commande
router.post("/order", productController.orderValidated);
module.exports = router;
