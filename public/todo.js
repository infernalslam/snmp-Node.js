/*global angular humanizeDuration moment  Chart*/
angular.module('todoApp', [])
  .controller('appController', function ($http, $interval) {
    var app = this
    app.title = 'moniting'
    getName()
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
  })
