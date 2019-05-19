const express = require('express');
const Product = require('../model/product');
const router = express.Router();

router.post('/register', async(req, res) => {
    try{
        const product = await Product.create(req.body);
        return res.send(product);
    }catch(err){
        return res.status(400).send({error: "Product registration failed!"});
    }
});

module.exports = app => app.use('/product', router);
