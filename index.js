var express = require('express')
var app = express()
var snmp = require('snmp-native')
var speedTest = require('speedtest-net')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var community = 'public'
// ///// set interval ////////
setRequestTime()
setInterval(function () {
  setRequestTime()
}, 5000)
// /////////////////////////
var vb = []
var oid1 = [1, 3, 6, 1, 2, 1, 1]
// http://10.9.99.2/
var sw4503 = new snmp.Session({ host: '10.9.99.2', community: community })
sw4503.getSubtree({ oid: oid1 }, function (err, varbinds) {
  vb.push({
    discription: varbinds[0].value,
    uptime: varbinds[2].value,
    name: varbinds[4].value
  })
  // console.log(vb[0].name)
  sw4503.close()
})
var r415 = new snmp.Session({ host: '10.41.160.1', community: community })
r415.getSubtree({ oid: oid1 }, function (err, varbinds) {
  vb.push({
    discription: varbinds[0].value,
    uptime: varbinds[2].value,
    name: varbinds[4].value
  })
  // console.log(vb[0].name)
  r415.close()
})
var r124 = new snmp.Session({ host: '10.1.201.1', community: community })
r124.getSubtree({ oid: oid1 }, function (err, varbinds) {
  vb.push({
    discription: varbinds[0].value,
    uptime: varbinds[2].value,
    name: varbinds[4].value
  })
  // console.log(vb[0].name)
  r124.close()
})
var r101c = new snmp.Session({ host: '10.1.101.1', community: community })
r101c.getSubtree({ oid: oid1 }, function (err, varbinds) {
  vb.push({
    discription: varbinds[0].value,
    uptime: varbinds[2].value,
    name: varbinds[4].value
  })
  // console.log(vb[0].name)
  r101c.close()
})

// var r101c = new snmp.Session({ host: '10.1.101.1', community: community })
// r101c.getSubtree({ oid: oid1 }, function (err, varbinds) {
//   vb.push({
//     discription: varbinds[0].value,
//     uptime: varbinds[2].value,
//     name: varbinds[4].value
//   })
//   // console.log(vb[0].name)
//   r101c.close()
// })

var r330a = new snmp.Session({ host: '10.3.24.1', community: community })
r330a.getSubtree({ oid: oid1 }, function (err, varbinds) {
  vb.push({
    discription: varbinds[0].value,
    uptime: varbinds[2].value,
    name: varbinds[4].value
  })
  // console.log(vb[0].name)
  r330a.close()
})

var r401 = new snmp.Session({ host: '10.4.101.1', community: community })
r401.getSubtree({ oid: oid1 }, function (err, varbinds) {
  vb.push({
    discription: varbinds[0].value,
    uptime: varbinds[2].value,
    name: varbinds[4].value
  })
  // console.log(vb[0].name)
  r401.close()
})

// ////////////////////////////next methord //////////////////////////////////////////////
var speed = []
// //////// speed ///////
function setRequestTime () {
  var test = speedTest({maxTime: 4000})
  test.on('data', function (data) {
    console.dir(data)
    speed.push(data)
  })
}
////////////r415////////////////////
///// variable ////////
var int_415 = []
var port_415 = []
var time_415 = []
var data415 = []
// ///// interface ////////
var getintR415 = new snmp.Session({ host: '10.4.15.1', community: community })
var oidget_int = '.1.3.6.1.2.1.2.2.1.2'
getintR415.getSubtree({ oid: oidget_int }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    int_415.push(data.value)
  })
  getintR415.close()
})
// /////// portstatus  ////////////
var getportR415 = new snmp.Session({ host: '10.4.15.1', community: community })
var oidget_port = '.1.3.6.1.2.1.2.2.1.8'
getportR415.getSubtree({ oid: oidget_port }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(data.value)
    port_415.push(data.value)
  })
  getportR415.close()
})

// .1.3.6.1.2.1.2.2.1.9
var gettimeR415 = new snmp.Session({ host: '10.4.15.1', community: community })
var oidget_time = '.1.3.6.1.2.1.2.2.1.9'
gettimeR415.getSubtree({ oid: oidget_time }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(int_415)
    time_415.push(data.value)
  })
  gettimeR415.close()
})
// ////////////////////401/////////////////
// 10.4.101.1
// /////////// variable /////////////////
var int_401 = []
var port_401 = []
var time_401 = []
var data401 = []
// ///// interface ////////
var getintR401 = new snmp.Session({ host: '10.4.101.1', community: community })
var oidget_int401 = '.1.3.6.1.2.1.2.2.1.2'
getintR401.getSubtree({ oid: oidget_int401 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    int_401.push(data.value)
  })
  getintR401.close()
})
// /////// portstatus  ////////////
var getportR401 = new snmp.Session({ host: '10.4.101.1', community: community })
var oidget_port401 = '.1.3.6.1.2.1.2.2.1.8'
getportR401.getSubtree({ oid: oidget_port401 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    port_401.push(data.value)
  })
  getportR401.close()
})

var gettimeR401 = new snmp.Session({ host: '10.4.101.1', community: community })
var oidget_time401 = '.1.3.6.1.2.1.2.2.1.9'
gettimeR401.getSubtree({ oid: oidget_time401 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    time_401.push(data.value)
  })
  gettimeR401.close()
})
// ///////////////////////////330////////////////////////////////////////////////
// /////////// variable /////////////////
var int_330 = []
var port_330 = []
var time_330 = []
var data330 = []
// ///// interface ////////
var getintR330 = new snmp.Session({ host: '10.3.24.1', community: community })
var oidget_int330 = '.1.3.6.1.2.1.2.2.1.2'
getintR330.getSubtree({ oid: oidget_int330 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    int_330.push(data.value)
  })
  getintR330.close()
})
// /////// portstatus  ////////////
var getportR330 = new snmp.Session({ host: '10.3.24.1', community: community })
var oidget_port330 = '.1.3.6.1.2.1.2.2.1.8'
getportR330.getSubtree({ oid: oidget_port330 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    port_330.push(data.value)
  })
  getportR330.close()
})

var gettimeR330 = new snmp.Session({ host: '10.3.24.1', community: community })
var oidget_time330 = '.1.3.6.1.2.1.2.2.1.9'
gettimeR330.getSubtree({ oid: oidget_time330 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    time_330.push(data.value)
  })
  gettimeR330.close()
})
// //////////////////////// 124 ////////////////////////////////////////////////
// /////////// variable /////////////////
var int_124 = []
var port_124 = []
var time_124 = []
var data124 = []
// ///// interface ////////
var getintR124 = new snmp.Session({ host: '10.1.201.1', community: community })
var oidget_int124 = '.1.3.6.1.2.1.2.2.1.2'
getintR124.getSubtree({ oid: oidget_int124 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    int_124.push(data.value)
  })
  getintR124.close()
})
// /////// portstatus  ////////////
var getportR124 = new snmp.Session({ host: '10.1.201.1', community: community })
var oidget_port124 = '.1.3.6.1.2.1.2.2.1.8'
getportR124.getSubtree({ oid: oidget_port124 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    port_124.push(data.value)
  })
  getportR124.close()
})

var gettimeR124 = new snmp.Session({ host: '10.1.201.1', community: community })
var oidget_time124 = '.1.3.6.1.2.1.2.2.1.9'
gettimeR124.getSubtree({ oid: oidget_time124 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    time_124.push(data.value)
  })
  gettimeR124.close()
})
// /////////////////////////////101c////////////////////////////////////////////////
// /////////// variable /////////////////
var int_101 = []
var port_101 = []
var time_101 = []
var data101 = []
// ///// interface ////////
var getintR101 = new snmp.Session({ host: '10.1.101.1', community: community })
var oidget_int101 = '.1.3.6.1.2.1.2.2.1.2'
getintR101.getSubtree({ oid: oidget_int101 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    int_101.push(data.value)
  })
  getintR101.close()
})
// /////// portstatus  ////////////
var getportR101 = new snmp.Session({ host: '10.1.101.1', community: community })
var oidget_port101 = '.1.3.6.1.2.1.2.2.1.8'
getportR101.getSubtree({ oid: oidget_port101 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    port_101.push(data.value)
  })
  getportR101.close()
})

var gettimeR101 = new snmp.Session({ host: '10.1.101.1', community: community })
var oidget_time101 = '.1.3.6.1.2.1.2.2.1.9'
gettimeR101.getSubtree({ oid: oidget_time101 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    time_101.push(data.value)
  })
  gettimeR101.close()
})
// ////////////////////////////sw4503 ///////////////////////////////////////////
// /////////// variable /////////////////
var int_4503 = []
var port_4503 = []
var time_4503 = []
var data4503 = []
// ///// interface ////////
var getintR4503 = new snmp.Session({ host: '10.9.99.2', community: community })
var oidget_int4503 = '.1.3.6.1.2.1.2.2.1.2'
getintR4503.getSubtree({ oid: oidget_int4503 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    int_4503.push(data.value)
  })
  getintR4503.close()
})
// /////// portstatus  ////////////
var getportR4503 = new snmp.Session({ host: '10.9.99.2', community: community })
var oidget_port4503 = '.1.3.6.1.2.1.2.2.1.8'
getportR4503.getSubtree({ oid: oidget_port4503 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    port_4503.push(data.value)
  })
  getportR4503.close()
})

var gettimeR4503 = new snmp.Session({ host: '10.9.99.2', community: community })
var oidget_time4503 = '.1.3.6.1.2.1.2.2.1.9'
gettimeR4503.getSubtree({ oid: oidget_time4503 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    time_4503.push(data.value)
  })
  gettimeR4503.close()
})
// ///////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////
// ///////////////////// api get source //////////////////////////////////////////
app.get('/name', function (req, res) {
  res.send(vb)
})
app.get('/speed', function (req, res) {
  res.send(speed)
})
app.get('/415', function (req, res) {
  int_415.forEach(function (err, index) {
    var set = {
      name: '415',
      int: int_415[index],
      port: port_415[index],
      time: time_415[index]
    }
    data415.push(set)
  })
  res.send(data415)
})
app.get('/401', function (req, res) {
  int_401.forEach(function (err, index) {
    var set = {
      name: '401',
      int: int_401[index],
      port: port_401[index],
      time: time_401[index]
    }
    data401.push(set)
  })
  res.send(data401)
})
app.get('/330', function (req, res) {
  int_330.forEach(function (err, index) {
    var set = {
      name: '330',
      int: int_330[index],
      port: port_330[index],
      time: time_330[index]
    }
    data330.push(set)
  })
  res.send(data330)
})
app.get('/124', function (req, res) {
  int_124.forEach(function (err, index) {
    var set = {
      name: '124',
      int: int_124[index],
      port: port_124[index],
      time: time_124[index]
    }
    data124.push(set)
  })
  res.send(data124)
})
app.get('/101', function (req, res) {
  int_101.forEach(function (err, index) {
    var set = {
      name: '101C',
      int: int_101[index],
      port: port_101[index],
      time: time_101[index]
    }
    data101.push(set)
  })
  res.send(data101)
})
app.get('/4503', function (req, res) {
  int_4503.forEach(function (err, index) {
    var set = {
      name: 'SW4503',
      int: int_4503[index],
      port: port_4503[index],
      time: time_4503[index]
    }
    data4503.push(set)
  })
  res.send(data4503)
})
// ////////////////server localhost /////////////////////////
app.use(express.static('public'))
app.listen(7001, function () {
  console.log('Example app listening on port 7001!')
})
