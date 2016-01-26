var app = angular.module('questionNAnswersApp', ['ngRoute', 'ngResource', 'templates']);

// Configure routes
app.config(['$routeProvider', '$locationProvider', 
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .when('/questions/:id', {
        templateUrl: 'showquestion.html',
        controller: 'QuestionsShowCtrl'
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

// Question factory
app.factory('Question', ['$resource', function($resource) {
  return $resource('/api/questions/:id', { id: '@id' });
}]);

// Configure controllers
app.controller('HomeCtrl', ['$scope', '$location', 'Question',
  function($scope, $location, Question) {
    $scope.questions = Question.query();

    $scope.addQuestion = function() {
      var questionData = $scope.question;
      Question.save(questionData,
        function(savedQuestion) {
          $scope.questions = Question.query();
          $location.path('/');
          $scope.question = {};
          $scope.addQuestionForm = false;
        },
        function(error) {
          console.log('error', error);
        }
      );
    };
  }
]);

// Configure controllers
app.controller('QuestionsShowCtrl', ['$scope', '$location', 'Question', '$routeParams',
  function($scope, $location, Question, $routeParams) {
    var questionId = $routeParams.id;
    Question.get({ id: questionId },
      function(data) {
        $scope.question = data;
      },
      function(error) {
        console.log(error);
        $location.path('/');
      }
    );

    $scope.addAnswer = function() {
      var questionData = $scope.question;
      Question.save(questionData,
        function(savedQuestion) {
          $scope.questions = Question.query();
          $location.path('/');
          $scope.question = {};
          $scope.addQuestionForm = false;
        },
        function(error) {
          console.log('error', error);
        }
      );
    };
  }
]);






