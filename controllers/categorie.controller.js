const ProductModel = require("../models/product.model");

//toutes les catégories
module.exports.getAllCategories = (req, res) => {
  console.log("coucou");
  try {
    ProductModel.find().distinct("categorie", function (error, categories) {
      // categories is an array of all ObjectIds

      res.status(200).json(categories);
    });
  } catch (err) {
    res.status(200).json({ err: "oupssssssss!!!!!" });
  }
};

//getAllProducts of One Categorie
module.exports.getAllProductsCategorie = async (req, res) => {
  console.log("coucou");
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
