const Product = require("../models/product.model.js");
const mongoose = require('mongoose');
const getProducts = async (req, res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message: "Internal Server Errors"});
    }
}

const getProduct = async (req, res)=>{
    try{
        const products = await Product.findById(req.params.id);
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message: "Internal Server Errors"});
    }

}


const storeProducts = async (req, res)=>{
    try{
       const product  = await Product.create(req.body);
       res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}


const updateProducts = async (req, res) => {
    try {
     
      const updatedData = await Product.findByIdAndUpdate(
        req.params.id,               
        { $set: { price: req.body.price } }, 
        { new: true }               
      );
  
   
      if (!updatedData) {
        return res.status(404).json({ message: "Product not found" });
      }
  
   
      res.status(200).json(updatedData);
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

const deleteProducts = async (req, res) => {
    try {
      // Validate the ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
      }
  
      // Find and delete the product
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  
      // If the product doesn't exist, send a 404 response
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Respond with the deleted product
      res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = { getProducts, getProduct, storeProducts, updateProducts, deleteProducts };