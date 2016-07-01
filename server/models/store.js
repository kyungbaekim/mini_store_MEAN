var mongoose = require('mongoose');
var path = require('path');

// create mongoose schema
var StoreCustomers = new mongoose.Schema({
 name: String,
}, {timestamps: true});

var StoreOrders = new mongoose.Schema({
 name: String,
 product: String,
 quantity: Number,
}, {timestamps: true});

var StoreProducts = new mongoose.Schema({
 name: String,
 image: String,
 description: String,
 quantity: Number,
}, {timestamps: true});

// we can add validations using the .path() method.
StoreCustomers.path('name').required(true, 'Name field cannot be blank');
StoreProducts.path('name').required(true, 'Product name cannot be blank');
StoreProducts.path('quantity').required(true, 'Product quantity cannot be blank');

mongoose.model('Customers', StoreCustomers);
mongoose.model('Orders', StoreOrders);
mongoose.model('Products', StoreProducts);
