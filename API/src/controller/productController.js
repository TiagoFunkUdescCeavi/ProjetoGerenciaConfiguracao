const express = require('express');
const Product = require('../model/product');
const mongoose = require('../database');
const router = express.Router();

router.put('/', async(req, res) => {
    const {description} = req.body;

    if (!description)
        return res.status(400).send({error: "The product need a description"});
    try{
        const product = await Product.create(req.body);
        return res.send(product);
    }catch(err){
        return res.status(400).send({error: "Product registration failed!"});
    }
});

router.get('/', async(req, res) => {
    try{
        var products = mongoose.model('Product');
        products.find(function(err, allProducts){
            res.send(allProducts);
        });
    }catch(err){
        return res.status(400).send({error: err});
    }
});

router.post("/",async function(req,res){  
  var newData = {
    "description": req.body.description,
    "manufacturer": req.body.manufacturer
  }
  
  var products = mongoose.model('Product');
  
  const finded = await products.findByIdAndUpdate(req.body._id, newData, {useFindAndModify: false});
  if (finded)
    res.send(finded)
  else res.status(400).send("error");
});

router.delete("/", async function(req,res){
  const finded = await Product.findByIdAndRemove(req.body._id, {useFindAndModify: false});
  res.send(finded);
})

module.exports = app => app.use('/product', router);
