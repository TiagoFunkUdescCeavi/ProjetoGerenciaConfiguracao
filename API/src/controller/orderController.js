const express = require('express');
const Order = require('../model/order');
const mongoose = require('../database');
const router = express.Router();

router.put('/', async(req, res) => {
    try{
        const order = await Order.create(req.body);
        return res.send(order);
    }catch(err){
        return res.status(400).send({error: "Order registration failed!"});
    }
});

router.get('/', async(req, res) => {
    try{
        var order = mongoose.model('Order');
        var allOrders = await order.find();
        res.send(allOrders);
    }catch(err){
        return res.status(400).send({error: err});
    }
});

module.exports = app => app.use('/order', router);
