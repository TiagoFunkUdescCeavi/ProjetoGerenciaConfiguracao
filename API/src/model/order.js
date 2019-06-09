const mongoose = require('../database');

const SaleItem = mongoose.Schema({
    product:  {},
    quantity: Number,
    price: Number,
    discount: Number
});

const OrderSchema = mongoose.Schema({
    client: {},
    products: [ SaleItem ],
    totalValue:{ type: Number },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
