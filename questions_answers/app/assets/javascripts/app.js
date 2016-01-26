var app = angular.module('QA-App', ['ngRoute', 'templates', 'ngResource']);

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

app.factory('Question', ['$resource', function ($resource) {
  return $resource('/api/questions/:id', { id: '@id' });
}]);

app.controller('HomeCtrl', ['$scope', 'Question' , function ($scope, Question) {
  $scope.homeTest = "Welcome to the homepage!";
  $scope.allQuestions =  Question.query();
  $scope.addQuestion = function () {
    var newQuestion  = $scope.question;
    Question.save(newQuestion, function (data) {
      $scope.allQuestions =  Question.query();
      console.log("Success");
    }, function (error) {
      console.log ("error", error);
    });
  };
}]);