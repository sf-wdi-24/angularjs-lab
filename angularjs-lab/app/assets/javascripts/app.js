var app = angular.module('angularjsApp', ['ngRoute', 'templates', 'ngResource']);

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

app.factory("Question", ["$resource", function($resource) {
	return $resource('/api/questions/:id', { id: '@id'});
}]);

app.controller('HomeCtrl', ['$scope', 'Question', function ($scope, Question) {
  $scope.homeTest = "Welcome to the homepage!";
  $scope.allQuestions = Question.query();
  $scope.newQuestion = new Question();
  $scope.addQuestion = function() {
  	console.log('button is clicked');
  	$scope.newQuestion.$save(function(data) {
  		console.log("success!");
  	}, function(error) {
  		console.log("error!");
  	});
  };
}]);