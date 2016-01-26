var app = angular.module('qa', ['ngRoute', 'templates']);
app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'QuestionCtrl'
      })
      .when('/newquestion', {
      	templateUrl: 'newquestion.html',
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

app.controller('QuestionCtrl', ['$scope', '$http', '$location', '$routeParams',  function ($scope, $http, $location, $routeParams) {
  $scope.homeTest = "Welcome to the homepage!";

  //get questions
  $http.get('/api/questions').then(function(data){
      console.log(data.data);
      $scope.questions = data.data;
    },
    function(err){
      console.log(err);
    });
  
  $scope.newquestion = function(){
    $http.post('/api/questions', $scope.question).then(function(data){
      console.log(data.data);
      $scope.questions.push(data.data);
      $location.path('/');
    },
    function(err){
      console.log(err);
    });
  };

  $scope.newAnswer = function(question){
    console.log(question);
    var questionId = question.id;

    $http.post('/api/questions/' + questionId + '/answers', question.answer).then(function(data){
      console.log(data.data);
      $scope.answer = {};
      question.answers.push(data.data);
    },
    function(err){
      console.log(err);
    });

  };
}]);


// app.controller('AnswerCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
//   $scope.homeTest = "Welcome to the homepage!";
//   $http.get('/api/questions').then(function(data){
//       console.log(data.data);
//       $scope.questions = data.data;
//     },
//     function(err){
//       console.log(err);
//     });
  
//   $scope.newquestion = function(){
//     $http.post('/api/questions', $scope.question).then(function(data){
//       console.log(data.data);
//       $scope.questions.push(data.data);
//       $location.path('/');
//     },
//     function(err){
//       console.log(err);
//     });
//   };
// }]);
