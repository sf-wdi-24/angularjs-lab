var app = angular.module('sampleApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
]);

app.controller('HomeCtrl', ['$scope', function ($scope) {
  $scope.homeTest = "Welcome to the homepage!";
}]);

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
// ADD THIS LINE
app.use(bodyParser.json());

// API Routes

app.get('/api/todos', function (req, res) {
  
});

app.post('/api/todos', function (req, res) {
  
});

app.get('/api/todos/:id', function (req, res) {
 
});

app.put('/api/todos/:id', function (req, res) {
 
});

app.delete('/api/todos/:id', function (req, res) {
  
});

app.get('*', function (req, res) {
  res.render('index');
});


app.get('/api/todos', function (req, res) {
  Todo.find(function (err, allTodos) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allTodos);
    }
  });
});

app.post('/api/todos', function (req, res) {
  var newTodo = new Todo(req.body);
  newTodo.save(function (err, savedTodo) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedTodo);
    }
  });
});