var express = require('express')
var app = express()
var snmp = require('snmp-native')
var network = require('network')
// var host = '10.1.160.1' // fitmwifi
var host = '10.41.160.1' // fitmwifi
// 10.4.15.1
// 10.12.160.1
// 172.23.176.1
var community = 'public'
var session = new snmp.Session({ host: host, community: community })
var session2 = new snmp.Session({ host: host, community: community })
var session3 = new snmp.Session({ host: host, community: community })
var session4 = new snmp.Session({ host: host, community: community })
var oid1 = [1, 3, 6, 1, 2, 1, 1]
var oid2 = '.1.3.6.1.2.1.4.20.1.1' // ip
var oid3 = '.1.3.6.1.2.1.4.21.1.11' // subnet
var oid4 = '.1.3.6.1.2.1.4.21.1.1' //iproute
var vb = []
var ip = []
var subnet = []
var iproute = []
// console.log(Name)
session.getSubtree({ oid: oid1 }, function (err, varbinds) {
  // vb = varbinds[0]
  // console.log(varbinds)
  vb.push({
    discription: varbinds[0].value,
    uptime: varbinds[2].value,
    name: varbinds[4].value
  })
  // console.log(vb[0].name)
  session.close()
})

session2.getSubtree({ oid: oid2 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(data.value)
    ip.push({
      ip: data.value
    })
  })
  session2.close()
})

session3.getSubtree({ oid: oid3 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    subnet.push({
      subnet: data.value
    })
  })
  session3.close()
})
session4.getSubtree({ oid: oid4 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    iproute.push({iproute:data.value})
  })
  session4.close()
})
network.get_interfaces_list(function(err, list) {
  // console.log(list) // interface
})
// ///////////////////////////////////////////////////////////////
app.get('/name', function (req, res) {
  res.send(vb)
})
app.get('/ip', function (req, res) {
  res.send(ip)
})
app.get('/subnet', function (req, res) {
  res.send(subnet)
})
app.get('/iproute', function (req, res) {
  res.send(iproute)
})
app.use(express.static('public'))
app.listen(7001, function () {
  console.log('Example app listening on port 7001!')
})
