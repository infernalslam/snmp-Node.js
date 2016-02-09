angular.module('todoApp', [])
  .controller('TodoListController', function($http) {
    var todoList = this;

    todoList.title = 'test'
    todoList.submit = function (){
      send()
    }

function send() {
    $http.get('/data')
          .then(function success (response) {
           console.log(response)
        }, function error (response) {
          alert(response.data.message)
        })
      }
  })
