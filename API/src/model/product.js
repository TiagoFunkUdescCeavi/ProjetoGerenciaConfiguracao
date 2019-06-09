const mongoose = require('../database');

const ProductSchema = mongoose.Schema({
    description:{
        type: String,
    },
    manufacturer:{
        type: String,
    },
    price:{
        type: Number,
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;