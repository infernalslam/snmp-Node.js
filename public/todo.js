angular.module('todoApp', [])
  .controller('TodoListController', function($http) {
    var todoList = this;

    todoList.title = 'test'
    todoList.submit = function (){
      send()
    }
    todoList.submit2 = function () {
      Subtree()
    }
    function Subtree () {
      $http.get('/subtree')
          .then (function success (response){
            console.log(response)
          } , function error (response){
            alert(response)
          })
    }

function send() {
    $http.get('/name')
          .then(function success (response) {
           console.log(response)
        }, function error (response) {
          alert(response.data.message)
        })
      }
  })
