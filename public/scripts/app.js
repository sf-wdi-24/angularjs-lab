var app = angular.module('myApp', ['ngRoute']);


app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      })
      .when('/question/:id', {
      	templateUrl: 'templates/question.html',
      	controller: 'QuestionCtrl'
      })
      .when('/questions', {
      	templateUrl: 'templates/questions.html',
      	controller: 'QuestionsCtrl'
      })
      .when('/submit', {
      	templateUrl: 'templates/submit.html',
      	controller: 'SubmitCtrl'
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

app.factory("API", ["$http", function($http) {
	var baseUrl = "/api/questions";
	return {
		query:function(){
			return $http.get(baseUrl).
		       then(function(result) {
		           return result.data;
		       });
		},
		get:function(id){
			return $http.get(baseUrl+"/"+id).
		       then(function(result) {
		           return result.data;
		       });
		},
		create:function(data){
			return $http.post(baseUrl,data);
		},
		update:function(id,data){
			return $http.put(baseUrl+"/"+id,data);
		},
		delete:function(id){
			return $http.delete(baseUrl+"/"+id);
		},
		createAnswer:function(data){
			return $http.post("/api/answers", data);
		}
	};
}]);

app.controller('SearchCtrl', ['$scope', 'API', function ($scope, API) {
  $scope.test = "Welcome to the search page!";
  $scope.allQuestions = API.query();
}]);

app.controller('SubmitCtrl', ['$scope', 'API', function ($scope, API) {
  $scope.test = "Welcome to the question submission page!";
  $scope.submitQuestion = function(){
  	API.create($scope.question);
  	$scope.question = {};
  };
}]);

app.controller('QuestionCtrl', ['$scope', '$routeParams', 'API', function ($scope, $routeParams, API) {
  $scope.test = "Welcome to the question page!";
  $scope.id = $routeParams.id;
  $scope.question = API.get($scope.id);
  $scope.submitAnswer = function(){
  	$scope.answer.question_id = $scope.id;
  	API.createAnswer($scope.answer);
  	$scope.answer = {};
  };
  $scope.updateQuestion = function(){
    console.log($scope.upquestion);
    API.update($scope.id,$scope.upquestion);
  };
}]);

app.controller('QuestionsCtrl', ['$scope', '$location', 'API', function ($scope, $location, API) {
  $scope.test = "Welcome to the top questions page!";
  $scope.allQuestions = API.query();
  $scope.delete = function(question){
  	API.delete(question._id).then(
        function (data){
          console.log(data);
          $location.path('/');
        }, function(error){
          console.log("error!");
          console.log(error);
        });
  };
}]);