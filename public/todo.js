/*global angular moment */
angular.module('todoApp', [])
  .controller('appController', function ($http, $interval) {
    var app = this
    app.title = 'moniting'
    getName()
    getIp()
    getSubnet()
    getIproutetype()
    getIprouteprotocol()
    getstatus()
    getnameinterface()
    getinterfaceTime()
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
    function getstatus () {
      $http.get('/status').then(function success (response) {
        app.status = response.data
      })
    }
    function getnameinterface () {
      $http.get('/interface').then(function success (response) {
        app.interface = response.data
      })
    }
    function getinterfaceTime () {
      $http.get('/time').then(function success (response) {
        app.time = response.data
      })
    }
    app.setTime = function (time) {
      return (time / 360000)
    }
  })
