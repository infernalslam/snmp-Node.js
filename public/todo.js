/*global angular humanizeDuration moment  Chart*/
angular.module('todoApp', [])
  .controller('appController', function ($http, $interval) {
    var app = this
    app.title = 'moniting'
    getName()
    getdata()
    $interval(function () {
      app.current_time = moment(new Date()).format('LTS')
    }, 10)
    getSpeed()
    app.loadforgrap = 0
    $interval(function () {
      getSpeed()
      test()
      getchart()
      app.loadforgrap++
    }, 7000)
    function getName () {
      $http.get('/name').then(function success (response) {
        app.name = response.data
      })
    }
    function getdata () {
      $http.get('/415').then(function success (response) {
        app.r415 = response.data
      })
      $http.get('/101').then(function success (response) {
        app.r101 = response.data
      })
      $http.get('/124').then(function success (response) {
        app.r124 = response.data
      })
      $http.get('/401').then(function success (response) {
        app.r401 = response.data
      })
      $http.get('/330').then(function success (response) {
        app.r330 = response.data
      })
      $http.get('/4503').then(function success (response) {
        app.r4503 = response.data
      })
    }
    app.select = function (obj) {
      if (obj === 'R415') {
        app.pageint = 1
        console.log(app.pageint)
      }
      if (obj === 'R330A') {
        app.pageint = 2
        console.log(app.pageint)
      }
      if (obj === 'R101C') {
        app.pageint = 3
        console.log(app.pageint)
      }
      if (obj === 'R124') {
        app.pageint = 4
        console.log(app.pageint)
      }
      if (obj === 'R40') {
        app.pageint = 5
        console.log(app.pageint)
      }
      if (obj === 'SW4503') {
        app.pageint = 6
        console.log(app.pageint)
      }
    }
    app.setTime = function (time) {
      return humanizeDuration(time)
    }

    // /////
    var data
    var myLineChart
    function getchart () {
      data = {
        labels: app.label,
        datasets: [
          {
            label: '202.44.47.252',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
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
            data: app.data
          }
        ]
      }
      var ctx = document.getElementById('myChart')
      myLineChart = new Chart(ctx, {
        type: 'line',
        data: data
      })
      console.log(myLineChart)
    }
    // ///
    app.load = true
    var count = 0
    var loading = $interval(function () {
      count++
      console.log(count)
      if (count === 2) {
        app.load = false
        $interval.cancel(loading)
      }
    }, 10000)
    // //////////////////////
    var pass = false
    // //////////////////////
    function getSpeed () {
      $http.get('/speed').then(function success (response) {
        app.speed = response.data
        if (response.data.length !== 0) {
          pass = true
        }
      })
    }
    app.label = []
    app.data = []
    function test () {
      if (app.speed.length === 0) {
        console.log('wait here')
      } if (pass) {
        app.speed.forEach(function (err, index) {
          console.log(app.data)
          app.label.push(app.speed[index].server.sponsor)
          app.data.push(app.speed[index].speeds.download)
        })
      }
    }
    // //////
  })
