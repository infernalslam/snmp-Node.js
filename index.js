var express = require('express')
var app = express()
var snmp = require('snmp-native')
// var util = require('util')
// var bodyParser = require('body-Parser')
var host = '10.1.160.1' // fitmwifi
// 10.4.15.1
// 10.12.160.1
// 172.23.176.1
var community = 'public'
var session = new snmp.Session({ host: host, community: community })
var oid = [1, 3, 6, 1, 2, 1, 1, 1, 0]
var Name
var vb
console.log(Name)
Name = session.get({ oid: oid }, function (err, varbinds) {
  if (err) {
  } else {
    vb = varbinds[0]
  // console.log(vb) // โชว์รุ่น
  }
  session.close()
})
var Subtree = []
var session2 = new snmp.Session({ host: host, community: community })
var oidStr = '.1.3.6.1.2.1.31.1.1.1.1'
oid = oidStr.split('.').filter(function (s) { return s.length > 0 }).map(function (s) { return parseInt(s, 10) })
session2.getSubtree({ oid: oid }, function (err, varbinds) {
  if (err) {
    console.log(err)
  } else {
    varbinds.forEach(function (vb) {
      Subtree.push(vb)
    // console.log(vb)
    })
  }
  session2.close()
})
var ipGateway = []
var session3 = new snmp.Session({ host: host, community: community })
session3.getSubtree({ oid: '.1.3.6.1.2.1.4.20.1.1' }, function (err, varbinds) {
  if (err) {
    console.log(err)
  } else {
    varbinds.forEach(function (vb) {
      ipGateway.push(vb)
    })
  }
  session3.close()
})
var upTime
var session4 = new snmp.Session({ host: host, community: community })
session4.get({ oid: '.1.3.6.1.2.1.1.3.0' }, function (err, varbinds) {
  if (err) {
    console.log(err)
  } else {
    // console.log(varbinds)
    varbinds.forEach(function (vb) {
      // console.log(vb)
      upTime = vb
    })
  }
  session4.close()
})
var operatorname
var session5 = new snmp.Session({ host: host, community: community })
session5.get({ oid: '.1.3.6.1.2.1.1.5.0' }, function (err, varbinds) {
  if (err) {
    console.log(err)
  } else {
    operatorname = varbinds
  // console.log(varbinds) // ชื่ออุปกรณ์
  }
  session5.close()
})
var networkAll = []
var session6 = new snmp.Session({ host: host, community: community })
session6.getSubtree({ oid: '.1.3.6.1.2.1.4.21.1.1' }, function (err, varbinds) {
  if (err) {
    console.log(err)
  } else {
    // console.log(varbinds) 
    varbinds.forEach(function (vb) {
      networkAll.push(vb)
      console.log(networkAll)
    })
  }
  session6.close()
})
// ///////////////////////////////////////////////////////////////
app.get('/name', function (req, res) {
  res.send(vb)
})
app.get('/Subtree', function (req, res) {
  res.send(Subtree)
})
app.get('/Gateway', function (req, res) {
  res.send(ipGateway)
})
app.get('/Uptime', function (req, res) {
  res.send(upTime)
})
app.get('/operator', function (req, res) {
  res.send(operatorname)
})
app.get('/networkAll', function (req, res) {
  res.send(networkAll)
})
app.use(express.static('public'))
app.listen(7001, function () {
  console.log('Example app listening on port 7001!')
})
