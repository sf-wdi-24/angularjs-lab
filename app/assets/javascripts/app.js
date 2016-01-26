var app = angular.module('qaApp', ['ngRoute', 'templates', 'ngResource']);
app.config(['$routeProvider', '$locationProvider', 
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'questions.html',
        controller: 'QuestionIndexCtrl'
      })
      .when('/questions/:id', {
        templateUrl: 'questionshow.html',
        controller: 'QuestionShowCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
  }]);
app.factory('Question', ['$resource', function($resource) {
  return $resource('/api/questions/:id', {id: '@_id'});
}]);

app.controller('QuestionIndexCtrl', ['$scope','Question', function($scope, Question) {
  // $scope.homeTest  = 'Testing testing';
  //find all questions and display them
  $scope.allQuestions = Question.query();
  $scope.newQuestion = {};
  //post new question
  $scope.createQuestion = function() {
    var newQuestion = $scope.newQuestion;
    console.log(newQuestion);
    Question.save(newQuestion, function(data) {
      console.log('this worked');
      $scope.allQuestions = Question.query();
      $scope.newQuestion = {};
    }, function(err) {
      console.log('failed');
    });
  };
}]);
app.controller('QuestionShowCtrl', ['$scope', '$routeParams', '$location', 'Question', function($scope, $routeParams, $location, Question) {
  // $scope.showTest = 'Testies';
  //find single question
  var questionsId = $routeParams.id;
  question = Question.get({id: questionsId}, 
    function(response) {
      $scope.singleQuestion = response;
      console.log('response');
    }, function (err) {
      console.log('failed');
    });
  $scope.editQuestion = function(){
    var questionEdit = question;
    Question.updated({id: questionsId}, questionEdit, function(data) {
      console.log(data);
    });
  };
  $scope.deleteQuestion = function() {
    Question.delete({id: questionsId});
    //redirect to index once deleted
    $location.path('/');
  };
}]);
