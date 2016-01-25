# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Angular Lab Solutions

You can use a nested `$resource` in Angular to interact with associated data on the server. Here's an example of how you can access a question's answers:

```js
angular.module('questionApp').factory('Question', [
  '$resource', function ($resource) {
    return $resource('questions/:id/:subResource', {}, {
      answers: {  // The `answers` action definition:
        params: { subResource: 'answers' },
        method: 'GET'
      }
    });
  }
]);
```