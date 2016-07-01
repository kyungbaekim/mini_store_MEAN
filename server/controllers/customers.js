// require mongoose
var mongoose = require('mongoose');
var Customers = mongoose.model('Customers');

module.exports = {
  index: function(req, res) {
    Customers.find({}, function(err, animals){
      if(err){
        console.log(err);
      }
      else{
        res.json(animals);
      }
    })
  },
  create: function(req, res) {
    console.log(req.body.name);
    var customer = new Customers({name: req.body.name});
    customer.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    })
  },
  delete: function(req, res) {
    Customers.remove({_id: req.params.id}, function(err){
      if(err){
        console.log(err);
      }
      else {
        res.redirect('/');
      }
    })
  }
}
