const express = require('express');
const Product = require('../model/product');
const mongoose = require('../database');
const router = express.Router();

router.post('/', async(req, res) => {
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

router.put("/",async function(req,res){
  const finded = await Product.findByIdAndUpdate( req.body._id, {
    $set: {
      description: req.body.description,
      manufacturer: req.body.manufacturer
    }
  }, { new: true });
  res.send( finded );
});

router.delete("/", async function(req,res){
  const finded = await Product.findByIdAndRemove(req.body._id, {useFindAndModify: false});
  res.send(finded);
})

module.exports = app => app.use('/product', router);
