const express = require('express');
const Product = require('../model/product');
const mongoose = require('../database');
const router = express.Router();

router.post('/register', async(req, res) => {
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

module.exports = app => app.use('/product', router);
