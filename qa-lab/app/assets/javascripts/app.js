var app = angular.module('qa-lab', ['ngRoute', 'templates', 'ngResource']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home.html',
			controller: 'HomeCtrl'
		})
		.when('/show/:id', {
			templateUrl: 'show.html',
			controller: 'ShowCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	$locationProvider.html5Mode({
		enabled: true, 
		requireBase: false
	});	
}]);

app.factory('Question', ['$resource', function ($resource) {
	return $resource('/api/questions/:id', { id: '@id' }, {
		query: { isArray: true },
		update: { method: 'PUT' }
	});
}]);

app.factory('Answer', ['$resource', function ($resource) {
	return $resource('/api/questions/:question_id/answers/:id', { question_id: '@question_id', id: '@id' }, {
		query: { isArray: true },
		update: { method: 'PUT' }
	});
}]);

app.controller('HomeCtrl', ['$scope', 'Question', 'Answer', function ($scope, Question, Answer) {
	
	$scope.allQuestions = Question.query();

	$scope.newQuestion = function() {
		Question.save($scope.question);
			$scope.allQuestions.push($scope.question);
			$scope.question = {};
	};

	$scope.updateQuestion = function(question) {
		var editQuestion = question;
		console.log(editQuestion);
		var updateQIndex = $scope.allQuestions.indexOf(editQuestion);
		Question.update(editQuestion);
		$scope.allQuestions.splice(updateQIndex, 1);
		$scope.allQuestions.push(editQuestion);
		$scope.showEditForm = false;
	};

	$scope.deleteQuestion = function(question) {
		var deleteQIndex = $scope.allQuestions.indexOf(question);
		console.log(deleteQIndex);
		Question.delete(question);	
		$scope.allQuestions.splice(deleteQIndex, 1);
	};

}]);

app.controller('ShowCtrl', ['$scope', '$routeParams', 'Question', 'Answer', function ($scope, $routeParams, Question, Answer) {
	var questionId = $routeParams.id;
	// Get specific question	
	$scope.question = Question.query({ where:{ id: questionId }},
		function (data) {
			$scope.question = data[0];
		});

	$scope.answer = Answer.query({ where: { question_id: questionId }},
		function (data) {
			$scope.answers = data;
		});

	$scope.newAnswer = function() {
		var answer = {
			'response': $scope.answer.response,
			'question_id': $scope.question.id
		};
		console.log(answer);
		Answer.save(answer);
	};
}]);