// require express
var express = require('express');
// create the express app
var app = express();
// path module -- try to figure out where and why we use this
var path = require('path');
// var moment = require('moment');

// Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
// Integrate body-parser with our App
app.use(bodyParser.json({extended:true}));

// static content
app.use(express.static(path.join(__dirname, "./client/static")));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

// tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
});
