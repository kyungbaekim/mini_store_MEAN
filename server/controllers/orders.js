// require mongoose
var mongoose = require('mongoose');
var Orders = mongoose.model('Orders');
var Products = mongoose.model('Products');

module.exports = {
  index: function(req, res) {
    Orders.find({}, function(err, orders){
      if(err){
        console.log(err);
      }
      else{
        res.json(orders);
      }
    })
  },
  create: function(req, res) {
    var order = new Orders({name: req.body.customer.name, quantity: req.body.quantity, product: req.body.product.name});
    order.save(function(err) {
      if(err) {
        console.log(err);
      } else {
        Products.update({name: req.body.product.name}, {$inc: {quantity: -req.body.quantity}}, function(err) {
          if(err){
            console.log(err);
          } else {
            res.redirect('/');
          }
        })
      }
    })
  },
  delete: function(req, res) {
    Orders.remove({_id: req.params.id}, function(err){
      if(err){
        console.log(err);
      }
      else {
        res.redirect('/');
      }
    })
  }
}
