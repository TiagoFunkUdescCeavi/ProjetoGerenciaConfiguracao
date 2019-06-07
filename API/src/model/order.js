const mongoose = require('../database');
const Client = require('./client');
const Product = require('./product');

const SaleItem = mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    },
    amount: Number,
    price: Number,
    discount: Number
});

const OrderSchema = mongoose.Schema({
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    products: [ SaleItem ],
    totalValue:{ type: Number },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
