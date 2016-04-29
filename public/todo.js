/*global angular  */
angular.module('todoApp', [])
  .controller('appController', function ($http, $interval) {
    var app = this
    app.title = 'moniting'
    getName()
    getIp()
    getSubnet()
    function getName () {
      $http.get('/name').then(function success (response) {
        app.name = response.data
      })
    }
    function getIp () {
      $http.get('/iproute').then(function success (response) {
        app.iproute = response.data
      })
    }
    function getSubnet () {
      $http.get('/subnet').then(function success (response) {
        app.subnet = response.data
      })
    }
  })
