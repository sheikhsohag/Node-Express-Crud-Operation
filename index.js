const express = require("express");
const mongoose  = require("mongoose");
const Product = require('./models/product.model.js');

const app = express();
app.use(express.json());



function errorHandler(err, req, res, next){
    if(res.headerSent){
        return next(err);
    }
    res.status(500).json({error: err});
}


app.listen(3000, ()=>{
    console.log("app listening at port 3000");
})

app.get('/',(req, res)=>{
    res.send("Hello from Node api server Updated! Yes it is");
})

app.get('/api/product/:id', async (req, res)=>{
    try{
        const products = await Product.findById(req.params.id);
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message: "Internal Server Errors"});
    }

})
app.get('/api/products', async (req, res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message: "Internal Server Errors"});
    }

})

app.post('/api/products', async (req, res)=>{
    try{
       const product  = await Product.create(req.body);
       res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

app.put('/api/products/update/:id', async (req, res) => {
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
  });
  


mongoose
.connect('mongodb+srv://sheikhsohag000:2ZPftFuLHQQf2uLu@backenddb.oag6h.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>console.log('connection successful!'))
.catch((err)=>console.log(err));