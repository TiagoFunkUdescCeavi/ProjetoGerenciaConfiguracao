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

router.get('/client', async(req, res) => {
  try{
    var order = mongoose.model('Order');
    var clientOrders = await order.find({"client._id":req.query.id});
    res.send(clientOrders);
  }catch(err){
    return res.status(400).send({error: err});
  }
});

router.post("/",async function(req,res){
  var newData = {
    "client": req.body.client,
    "products": req.body.products
  }

  var orders = mongoose.model('Order');

  const finded = await orders.findByIdAndUpdate(req.body._id, newData, {useFindAndModify: false});
  if (finded)
    res.send(finded)
  else res.status(400).send("error");
});

router.delete("/", async function(req,res){
  const finded = await Order.findByIdAndRemove(req.body._id, {useFindAndModify: false});
  res.send(finded);
})

module.exports = app => app.use('/order', router);
