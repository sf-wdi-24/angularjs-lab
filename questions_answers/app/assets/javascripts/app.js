var app = angular.module('QA-App', ['ngRoute', 'templates', 'ngResource']);

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .when('/questions/:id', {
        templateUrl: 'show.html',
        controller: 'QuestionShowCtrl'
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
  return $resource('/api/questions/:id', { id: '@_id' }, 
    {
      update: { method: 'PUT' }
    });
}]);

app.controller('HomeCtrl', ['$scope', 'Question' , function ($scope, Question) {
    $scope.allQuestions =  Question.query();
  $scope.addQuestion = function () {
    var newQuestion  = $scope.newQuestion;
    Question.save(newQuestion, function (data) {
      $scope.allQuestions =  Question.query();
      console.log("Success");
      $scope.newQuestion = {};
      $scope.newForm = false;
    }, function (error) {
      console.log ("error", error);
    });
  };
}]);

app.controller('QuestionShowCtrl', ['$scope', '$routeParams', '$location', 'Question', function($scope, $routeParams, $location, Question) {
  var questionId = $routeParams.id;
  console.log(questionId);
  question = Question.get({id: questionId},
    function(result) {
      $scope.question = result;
      console.log(result);
    },
    function(error) {
      console.log(error.statusText);
      // $location.path("/");
    });
  $scope.editQuestion = function () {
    var editedQuestion = question;
    Question.update({id: questionId}, editedQuestion, function(data) {
    });
    $scope.editForm = false;
  };

  $scope.deleteQuestion = function() {
    Question.delete({id: questionId});
    $location.path("/");
  };
}]);