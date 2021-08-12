const productModel = require("../models/product.model");
const ProductModel = require("../models/product.model");
//const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs"); //natif express ou node
const { promisify } = require("util"); //natif express ou node
const pipeline = promisify(require("stream").pipeline);

const ObjectID = require("mongoose").Types.ObjectId;

//Création produit
module.exports.newProduct = async (req, res) => {
  let fileName;
  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");
    } catch (err) {
      //const errors = uploadErrors(err);
      return res.status(201).json({ err: "y'a un probleme ici" });
    }
    fileName = req.body.name + ".jpg";
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../admin/public/uploads/products/${fileName}`
      )
    );

    const newProduct = new productModel({
      categorie: req.body.categorie,
      name: req.body.name,
      colors: req.body.colors,
      imageUrl: req.file !== null ? "./uploads/products/" + fileName : "",
      price: req.body.price,
      description: req.body.description,
    });

    try {
      const product = await newProduct.save();
      return res.status(201).json(product);
    } catch (err) {
      res.status(200).send({ err: "raté" });
    }
  }
};

//tous les produits
module.exports.getAllProducts = async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json(products);
};
//1 produit
module.exports.getOneProduct = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  } else {
    ProductModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("erreur");
    });
  }
};

//toutes les catégories
module.exports.getAllCategories = async (req, res) => {
  try {
    ProductModel.find().distinct("categorie", function (error, categories) {
      // categories is an array of all ObjectIds
      res.status(200).json(categories);
    });
  } catch (err) {
    res.status(200).json({ err: "oupssssssss!!!!!" });
  }
};
