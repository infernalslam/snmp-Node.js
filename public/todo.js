/*global angular alert*/
angular.module('todoApp', [])
  .controller('appController', function ($http) {
    var app = this
    Name()
    send()
    Subtree()
    app.title = 'Monitor'
    // app.ipnetwork = []
    function Subtree () {
      $http.get('/subtree')
        .then(function success (response) {
          app.ipnetwork = response
        }, function error (response) {
          alert(response)
        })
    }
    function Name () {
      $http.get('/name').then(function success (response) {
        app.os = response.data
        console.log(app.os)
      })
    }

    function send () {
      $http.get('/name')
        .then(function success (response) {
          console.log(response)
        }, function error (response) {
          alert(response.data.message)
        })
    }
  })
