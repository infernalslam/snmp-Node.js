/*global angular  */
angular.module('todoApp', [])
  .controller('appController', function ($http, $interval) {
    var app = this
    app.title = 'moniting'
    getName()
    getIp()
    getSubnet()
    getIproutetype()
    getIprouteprotocol()
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
    function getIproutetype () {
      $http.get('/iproutetype').then(function success (response) {
        app.iproutetype = response.data
      })
    }
    function getIprouteprotocol () {
      $http.get('/iprouteprotocol').then(function success (response) {
        app.iprouteprotocol = response.data
      })
    }
  })
