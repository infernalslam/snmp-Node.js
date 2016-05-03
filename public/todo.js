/*global angular */
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
    chartjs()
    function chartjs () {
      var data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
          }
        ]
      }
      var ctx = document.getElementById('myChart')
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data
      })
    }
    app.finished = function (index) {
      console.log(index)
    }
    app.load = true
    var count = 0
    $interval(function () {
      count++
      console.log(count)
      if (count === 2) {
        app.load = false
      }
    }, 10000)
  })
