var customers = require('../controllers/customers.js');
var orders = require('../controllers/orders.js');
var products = require('../controllers/products.js');

module.exports = function(app) {
  app.get('/customers', function(req, res) {
    customers.index(req, res);
  })

  app.get('/orders', function(req, res) {
    orders.index(req, res);
  })

  app.get('/products', function(req, res) {
    products.index(req, res);
  })

  app.post('/new_customer', function(req, res) {
    customers.create(req, res);
  })

  app.post('/new_order', function(req, res) {
    orders.create(req, res);
  })

  app.post('/customer/delete/:id', function(req, res) {
    customers.delete(req, res);
  })

  app.post('/product/delete/:id', function(req, res) {
    products.delete(req, res);
  })

  app.post('/order/delete/:id', function(req, res) {
    orders.delete(req, res);
  })

  app.post('/new_product', function(req, res) {
    products.create(req, res);
  })

  app.post('/search_product', function(req, res) {
    console.log(req.body);
    products.search(req, res);
  })
}
