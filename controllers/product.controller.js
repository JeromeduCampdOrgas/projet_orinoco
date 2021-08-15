const productModel = require("../models/product.model");
const ProductModel = require("../models/product.model");
//const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs"); //natif express ou node
const { promisify } = require("util"); //natif express ou node
const pipeline = promisify(require("stream").pipeline);

const ObjectID = require("mongoose").Types.ObjectId;
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();
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
        `${__dirname}/../admin/src/assets/uploads/products/${fileName}`
      )
    );

    const newProduct = new productModel({
      categorie: req.body.categorie,
      name: req.body.name,
      colors: req.body.colors,
      imageUrl: req.file !== null ? "./uploads/products/" + fileName : "",
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
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
//get 1 produit
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
//getAllProductsCategorie
module.exports.getAllProductsCategorie = async (req, res) => {
  await ProductModel.find({ categorie: req.params.categorie }, (err, docs) => {
    res.send(docs);
  });
};
//delete one categorie
module.exports.deleteOneProductsCategorie = async (req, res) => {
  try {
    await ProductModel.deleteMany({ categorie: req.params.categorie }).exec();
    return res.status(200).json({ message: "Categorie successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
//updateOneCategorie (name)
module.exports.updateOneCategorie = async (req, res) => {
  ProductModel.updateMany(
    { categorie: req.params.categorie },
    {
      $set: { categorie: req.body.categorie },
    },
    { new: false, upsert: true, setDefaultsOnInsert: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.status(400).json({ err });
      }
    }
  );
};

//update 1 produit
module.exports.updateOneProduct = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  } else {
    await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { price: req.body.price },
        $set: { colors: req.body.colors },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          res.send(docs);
        } else {
          res.status(400).json({ err: "erreur!!" });
        }
      }
    );
  }
};
//delete 1produit
module.exports.deleteOneProduct = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  } else {
    try {
      await ProductModel.remove({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
};
//toutes les catégories
module.exports.getAllCategories = (req, res) => {
  try {
    ProductModel.find().distinct("categorie", function (error, categories) {
      // categories is an array of all ObjectIds
      res.status(200).json(categories);
    });
  } catch (err) {
    res.status(200).json({ err: "oupssssssss!!!!!" });
  }
};
//validation commande

exports.orderValidated = (req, res, next) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.address ||
    !req.body.city ||
    !req.body.email ||
    !req.body.products
  ) {
    return res.status(400).send(new Error("Bad request!"));
  } else {
    const orderId = uuid;
    return res.status(200).json({ "orderId:": orderId });
  }
};
