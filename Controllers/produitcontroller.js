const Produit = require("./../models/Produit");
const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const sendNotification = (msg) => {
  io.emit("notification", msg);
  console.log(msg);
};

const addproduit = async (req, res) => {
  try {
    const produit = new Produit({
      libelle: req.body.libelle,
      prix: req.body.prix,
      quantity: req.body.quantity,
      designation: req.body.designation,
    });

    await produit.save();
    sendNotification(`product ${produit.libelle} has been added`);
    res.json({
      status: "success",
      message: `produit ${produit.libelle} has been added succesfully `,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getproduitbyid = async (req, res) => {
  try {
    const id = req.params.id;

    const produit = await Produit.findById(req.params.id);
    sendNotification(`product ${produit.libelle} has been found by Id`);
    res.json({ produit });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const updateproduit = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id, (err, data) => {
      data.libelle = req.body.libelle;
      data.prix = req.body.prix;
      data.quantity = req.body.quantity;
      data.designation = req.body.designation;
      data.save();
      sendNotification(`product ${data.libelle} has been updated`);
      res.json({ status: "updated" });
    });
  } catch (error) {
    res.status(400).json({ status: "failed" });
  }
};
const deleteproduit = async (req, res) => {
  try {
    await Produit.findByIdAndRemove(req.params.id);
    res.json({ status: "success" });
    sendNotification(`product has been deleted`);
  } catch (error) {
    res.status(500).json({ status: "failed" });
  }
};

const getbylibelle = async (req, res) => {
  try {
    const lib = req.params.libelle;
    const produit = await Produit.find({ libelle: lib });
    sendNotification(`product by the libelle ${lib} has been found`);
    res.json({ produit });
  } catch (error) {
    res.status(404).json({ status: "not found" });
  }
};
const sorting = async (req, res) => {
  const field = req.params.field;
  const sortOptions = {};

  sortOptions[field] = 1;

  Produit.find({}, (err, produits) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving products from database");
    } else if (!produits) {
      res.status(404).send("No products found in database");
    } else {
      // Emit a 'notification' event with the message to be sent
      sendNotification(`Products sorted by ${field} `);
      produits.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      });

      res.send(produits);
    }
  }).sort(sortOptions);
};
module.exports = {
  addproduit,
  getproduitbyid,
  updateproduit,
  deleteproduit,
  getbylibelle,
  sorting,
};
