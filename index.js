const express = require("express");
const mongoose  = require("mongoose");
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');

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


app.use("/api/products", productRoute);


  
  


mongoose
.connect('mongobdconnection string')
.then(()=>console.log('connection successful!'))
.catch((err)=>console.log(err));
