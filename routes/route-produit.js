const express = require("express");
const controller = require("./../Controllers/produitcontroller");
const router_produit = express.Router();

router_produit.post("/add", controller.addproduit);
router_produit
  .get("/:id", controller.getproduitbyid)
  .put("/:id", controller.updateproduit)
  .delete("/:id", controller.deleteproduit);
//router_produit.delete('/delete/:id',deleteproduit)
router_produit.get("/libelle/:libelle", controller.getbylibelle);
router_produit.get("/sorting/:field", controller.sorting);
module.exports = router_produit;
