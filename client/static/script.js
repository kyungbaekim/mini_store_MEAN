var store = angular.module('store_app', ['ngRoute', 'angularMoment']);
store.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
      templateUrl: 'partials/dashboard.html'
    })
    .when('/products',{
      templateUrl: 'partials/products.html'
    })
    .when('/orders',{
      templateUrl: 'partials/orders.html'
    })
    .when('/customers',{
      templateUrl: 'partials/customers.html'
    })
    .when('/settings',{
      templateUrl: 'partials/settings.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

store.factory('productFactory', function($http){
  var products = [];
  var factory = {};
  var error = {message: 'Product with the name already exists!'};
  //Restful syntax: index = get all that object
  factory.index = function(callback) {
    // Where do we get access to $http?
    $http.get('/products').success(function(data) {
      console.log('Data received successfully');
      products = data;
      callback(products);
    })
  }
  // note the use of callbacks!
  // Restful syntax: create = add product to DB
  factory.addProduct = function(newProduct, callback) {
    for(var i=0; i<products.length; i++){
      if(products[i].name == newProduct.name){
        console.log(error.message);
        // return error;
        callback(error);
      }
    }
    console.log('Sending add product request',newProduct);
    $http.post('/new_product', newProduct).success(function() {
      $http.get('/products').success(function(data) {
        products = data;
        callback(products);
      })
    })
  }
  factory.searchProduct = function(Product, callback) {
    console.log('Sending search product request', Product);
    $http.post('/search_product', Product).success(function(data) {
      products = data;
      callback(products);
    })
  }
  factory.removeProduct = function(data, callback) {
    $http.post('/product/delete/' + data).success(function() {
      console.log('Product remove request sent');
      $http.get('/products').success(function(data) {
        products = data;
        callback(products);
      })
    })
  }
  return factory;
});

store.factory('customerFactory', function($http){
  var customers = [];
  var factory = {};
  var error = {message: 'The name you entered already exists. Please use another name.'};
  //Restful syntax: index = get all that object
  factory.index = function(callback) {
    // Where do we get access to $http?
    $http.get('/customers').success(function(data) {
      console.log('Data received successfully');
      customers = data;
      callback(customers);
    })
  }
  // note the use of callbacks!
  // Restful syntax: create = add one to DB
  factory.create = function(newData, callback) {
    console.log(newData);
    for(var i=0; i<customers.length; i++){
      if(customers[i].name == newData.name){
        console.log(error.message);
        callback(error);
        return error;
      }
      // callback(error);
    }
    console.log('Sending add customer request',newData);
    $http.post('/new_customer', newData).success(function(data) {
      $http.get('/customers').success(function(data) {
        customers = data;
        callback(customers);
      })
    })
  }
  // Restful syntax: remove = remove one friend object by given friend name from DB
  factory.removeCustomer = function(data, callback) {
    $http.post('/customer/delete/' + data).success(function() {
      console.log('Remove request sent');
      $http.get('/customers').success(function(data) {
        customers = data;
        callback(customers);
      })
    })
  }
  return factory;
});

store.factory('orderFactory', function($http){
  var orders = [];
  var factory = {};
  //Restful syntax: index = get all that object
  factory.index = function(callback) {
    // Where do we get access to $http?
    $http.get('/orders').success(function(data) {
      orders = data;
      callback(orders);
    })
  }
  // note the use of callbacks!
  // Restful syntax: create = add one to DB
  factory.addOrder = function(newData, callback) {
    $http.post('/new_order', newData).success(function() {
      $http.get('/orders').success(function(data) {
        orders = data;
        callback(orders);
      })
    })
  }
  factory.removeOrder = function(data, callback) {
    $http.post('/order/delete/' + data).success(function() {
      console.log('Ordre remove request sent');
      $http.get('/orders').success(function(data) {
        orders = data;
        callback(orders);
      })
    })
  }
  return factory;
});

store.filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min);
    max = parseInt(max);
    for (var i=min; i<=max; i++)
      input.push(i);
    return input;
  };
});

store.filter('array', function() {
  return function(arrayLength) {
    if (arrayLength) {
      arrayLength = Math.ceil(arrayLength);
      var arr = new Array(arrayLength), i = 0;
      for (; i < arrayLength; i++) {
          arr[i] = i;
      }
      return arr;
    }
  };
});

store.controller('ProductsController', function($scope, productFactory){
  // console.log(moment());
  productFactory.index(function(data){
    $scope.products = data;
    console.log($scope.products);
  });
  $scope.addProduct = function(){
    productFactory.addProduct($scope.new_product, function(){
      productFactory.index(function(data){
        // console.log(Object.keys(data));
        if(Object.keys(data) == 'message'){
          $scope.error = data;
        } else {
          $scope.products = data;
          $scope.new_product = {};
        }
      });
    });
  };
  $scope.searchProduct = function(){
    console.log($scope.product_name);
    productFactory.searchProduct($scope.product_name, function(data){
      $scope.products = data;
    });
  };
  $scope.removeProduct = function(product){
    productFactory.removeProduct(product._id, function(data){
      $scope.products = data;
      $scope.new_product = {};
      $('#name').focus();
    });
  }
});

store.controller('CustomersController', function(customerFactory, $scope){
  customerFactory.index(function(data) {
    $scope.customers = data;
    $('#name').focus();
  });
  $scope.addCustomer = function(){
    customerFactory.create($scope.new_customer, function(data) {
      console.log(Object.keys(data)[0]);
      if(Object.keys(data)[0] == 'message'){
        $scope.error = data;
      } else {
        console.log(data);
        $scope.customers = data;
        $scope.error = {};
      }
      $scope.new_customer = {};
      $('#name').focus();
    });
  }
  $scope.removeCustomer = function(customer){
    customerFactory.removeCustomer(customer._id, function(data){
      $scope.customers = data;
      $scope.new_customer = {};
      $('#name').focus();
    });
  }
});

store.controller('OrdersController', function($scope, orderFactory, customerFactory, productFactory){
  orderFactory.index(function(data){
    $scope.orders = data;
    console.log($scope.orders);
  });
  customerFactory.index(function(data){
    $scope.customers = data;
  });
  productFactory.index(function(data){
    $scope.products = data;
  });
  $scope.addOrder = function(){
    // console.log($scope.new_order);
    orderFactory.addOrder($scope.new_order, function(data){
      // orderFactory.index(function(data){
        $scope.orders = data;
      // });
    });
  };
  $scope.removeOrder = function(order){
    console.log('button clicked');
    orderFactory.removeOrder(order._id, function(data){
      $scope.orders = data;
      $('#name').focus();
    });
  }
});
