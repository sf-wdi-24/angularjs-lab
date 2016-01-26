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
  return $resource('/api/questions/:id', { id: '@id' }, 
    {
      update: { method: 'PUT' }
    });
}]);

app.controller('HomeCtrl', ['$scope', 'Question' , function ($scope, Question) {
  $scope.homeTest = "Welcome to the homepage!";
  $scope.allQuestions =  Question.query();
  $scope.addQuestion = function () {
    var newQuestion  = $scope.newQuestion;
    Question.save(newQuestion, function (data) {
      $scope.allQuestions =  Question.query();
      console.log("Success");
    }, function (error) {
      console.log ("error", error);
    });
  };

  $scope.editQuestion = function (question) {
    var editedQuestion = question;
    Question.update({id: question.id}, editedQuestion, function(data) {
    });
    $scope.editForm = false;
  };

  $scope.deleteQuestion = function(question) {
    Question.delete({id: question.id});
    questionToBeDelete = $scope.allQuestions.filter(function(eachQuestion) {
      return eachQuestion.id === question.id;
    })[0];
    questionToBeDeleteIndex = $scope.allQuestions.indexOf(questionToBeDelete);
    $scope.allQuestions.splice(questionToBeDeleteIndex, 1);
  };
}]);