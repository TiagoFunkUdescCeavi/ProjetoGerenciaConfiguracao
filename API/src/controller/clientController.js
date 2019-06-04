const express = require('express');
const Client = require('../model/client');
const mongoose = require('../database');
const router = express.Router();

router.put('/', async(req, res) => {
    try{
        const client = await Client.create(req.body);
        return res.send(client);
    }catch(err){
        return res.status(400).send({error: "Client registration failed!"});
    }
});

router.get('/', async(req, res) => {
    try{
        var clients = mongoose.model('Client');
        clients.find(function(err, allClients){
            if (err)
                res.status(400).send({error: err});
            else res.send(allClients);
        });
    }catch(err){
        return res.status(400).send({error: err});
    }
});

router.post("/",async function(req,res){
  var newData = {
    "name": req.body.name,
    "cpf": req.body.cpf,
    "street": req.body.street,
    "houseNumber": req.body.houseNumber,
    "neighborhood": req.body.neighborhood,
    "city": req.body.city,
    "cep": req.body.cep,
    "state": req.body.state
  }

  var products = mongoose.model('Client');

  const finded = await products.findByIdAndUpdate(req.body._id, newData, {useFindAndModify: false});
  if (finded)
    res.send(newData);
  else res.status(400).send("error");
});

router.delete("/", async function(req,res){

})

module.exports = app => app.use('/client', router);
