const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");
const { getProducts, getProduct, storeProducts, updateProducts, deleteProducts } = require("../controllers/productController.js");




router.get("/", getProducts );
router.get("/:id", getProduct );
router.post("/", storeProducts );
router.put("/update/:id", updateProducts );
router.delete("/delete/:id", deleteProducts );


module.exports = router;