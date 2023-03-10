const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  libelle: {
    type: String,
  },
  prix: Number,
  quantity: Number,
  designation: String,
});

const Produit = mongoose.model("Produit", userSchema);

module.exports = Produit;
