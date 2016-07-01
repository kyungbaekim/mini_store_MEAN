// require mongoose
var mongoose = require('mongoose');
var Products = mongoose.model('Products');

module.exports = {
  index: function(req, res) {
    Products.find({}, function(err, products){
      if(err){
        console.log(err);
      }
      else{
        res.json(products);
      }
    })
  },
  create: function(req, res) {
    // console.log(req.body);
    var product = new Products({name: req.body.name, image: req.body.image, description: req.body.description, quantity: req.body.quantity});
    product.save(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  },
  search: function(req, res) {
    // console.log(req.body);
    Products.find({name: new RegExp(req.body.search, 'i')}, function(err, products){
      if(err){
        console.log(err);
      }
      else{
        res.json(products);
      }
    })
  },
  delete: function(req, res) {
    Products.remove({_id: req.params.id}, function(err){
      if(err){
        console.log(err);
      }
      else {
        res.redirect('/');
      }
    })
  }
}
