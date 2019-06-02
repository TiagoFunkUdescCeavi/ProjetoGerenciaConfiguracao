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
            res.send(allClients);
        });
    }catch(err){
        return res.status(400).send({error: err});
    }    
});

router.post("/",async function(req,res){  
  
});

router.delete("/", async function(req,res){
  
})

module.exports = app => app.use('/client', router);
