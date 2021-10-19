const ProductModel = require("../models/product.model");
const fs = require("fs"); //natif express ou node
const { promisify } = require("util"); //natif express ou node
const pipeline = promisify(require("stream").pipeline);

const ObjectID = require("mongoose").Types.ObjectId;
const { v4: uuidv4 } = require("uuid");
const { json } = require("body-parser");
const uuid = uuidv4();

//Création produit
module.exports.newProduct = (req, res) => {
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
    console.log(fileName);
    pipeline(
      req.file.stream,
      //console.log(req.file.stream)
      fs.createWriteStream(
        `${__dirname}/../../client/public/uploads/products/${fileName}`
      )
    );

    const newProduct = new ProductModel({
      categorie: req.body.categorie,
      name: req.body.name,
      colors: req.body.colors,
      imageUrl: req.file !== null ? "./uploads/products/" + fileName : "",
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
    });

    try {
      const product = newProduct.save();

      return res.status(201).json(product);
    } catch (err) {
      res.status(200).send({ err: "raté" });
    }
  }
};

//get 1 produit
module.exports.getProduct = (req, res) => {
  //console.log("coucou");
  //console.log(req.params.id);
  ProductModel.findOne({ _id: req.params.id }, (err, docs) => {
    res.send(docs);
  });
};
//tous les produits
module.exports.getAllProducts = async (req, res) => {
  const products = await ProductModel.find();
  /*produits.push(products);
  console.log(produits);*/
  res.status(200).json(products);
};

//update 1 produit
module.exports.updateOneProduct = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  } else {
    console.log(req.params.id);
    console.log(req.body.stock);
    console.log(req.body.price);
    await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          colors: req.body.colors,
        },
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
      await ProductModel.deleteOne({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
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
