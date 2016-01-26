var app = angular.module('baseApp', ['ngRoute', 'ngResource', 'templates']);

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

app.factory("Question", ['$resource', function($resource) {
	return $resource("api/questions/:id", {id: '@id'}, {
		query: {
			isArray: true,
			transformResponse: function(data) { 
				return angular.fromJson(data); 
			}
		}
	});
}]);

app.controller('HomeCtrl', ['$scope', '$location', 'Question', function($scope, $location, Question) {
	$scope.homeTest = "Welcome to the homepage!";

	$scope.questions = Question.query();
	
	$scope.addQuestion = function() {
		var newQuestion = Question.save($scope.question);
		$scope.questions.push(newQuestion);
		$scope.question = {};
	};

	$scope.editQuestion = function() {
		Question.update({id: question.id});
	};

	$scope.deleteQuestion = function(question) {
		Question.delete({id: question.id});
		var foundQuestion = $scope.questions.filter(function(eachQuestion) {
			return eachQuestion.id === question.id;
		})[0];
		var foundQuestionIndex = $scope.questions.indexOf(foundQuestion);
		$scope.questions.splice(foundQuestionIndex, 1);
    $location.path('/');
	};
}]);
