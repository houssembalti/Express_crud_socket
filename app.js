const express = require("express");
const app = express();
app.use(express.json());
const router_produit = require("./routes/route-produit");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();




mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB database!");
  }
);

app.use("/produit", router_produit);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

