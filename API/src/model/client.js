const mongoose = require('../database');

const ClientSchema = mongoose.Schema({
    name:{
        type: String,
    },
    cpf:{
        type: String,
    },
    street:{
        type: String,
    },
    houseNumber:{
        type: [Number],
    },
    neighborhood:{
        type: String,
    },
    city:{
        type: String,        
    },
    cep:{
        type: String,
    },
    state:{
        type: String,
    }
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;