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

app.post('/api/products', async (req, res)=>{
    try{
       const product  = await Product.create(req.body);
       res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

mongoose
.connect('mongodb+srv://sheikhsohag000:2ZPftFuLHQQf2uLu@backenddb.oag6h.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>console.log('connection successful!'))
.catch((err)=>console.log(err));