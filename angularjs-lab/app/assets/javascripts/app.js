var app = angular.module('angularjsApp', ['ngRoute', 'templates', 'ngResource']);

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .when('/question/:id', {
        templateUrl: 'question.html',
        controller: 'QuestionCtrl'
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
	return $resource('/api/questions/:id', { id: '@id'}, {
		"update": { method: "PUT"}
	});
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
  $scope.editQuestion = function(question) {
  	console.log("edit button clicked!", question);
  	question.editting = true;
  };
  $scope.updateQuestion = function(question) {
  	console.log("question updated!", question);
  	question.$update(function(data) {
  		console.log("success!");
  	}, function(error) {
  		console.log("error!");
  	});
  };
  $scope.deleteQuestion = function(question) {
  	console.log("delete button clicked!", question);
  	question.$delete(function(data) {
  		console.log("success!");
  	}, function(error) {
  		console.log("error!");
  	});
  };
}]);

app.controller('QuestionCtrl', ['$scope', '$routeParams','Question', function ($scope, $routeParams, Question) {
	var questionId = $routeParams.id;
	$scope.question = Question.get({id: questionId});
}]);