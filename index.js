var express = require('express')
var app = express()
var snmp = require('snmp-native')
var speedTest = require('speedtest-net')
var net_snmp = require('net-snmp')
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
var session5 = new snmp.Session({ host: host, community: community })
var oid1 = [1, 3, 6, 1, 2, 1, 1]
var oid3 = '.1.3.6.1.2.1.4.21.1.11' // subnet
var oid4 = '.1.3.6.1.2.1.4.21.1.1' // iproute

var vb = []
var ip = []
var subnet = []
var iproute = []
var vlan = []
var speed = []

session.getSubtree({ oid: oid1 }, function (err, varbinds) {
  vb.push({
    discription: varbinds[0].value,
    uptime: varbinds[2].value,
    name: varbinds[4].value
  })
  // console.log(vb[0].name)
  session.close()
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
    iproute.push({iproute: data.value})
  })
  session4.close()
})

test = speedTest({maxTime: 3000})
test.on('data', function (data) {
  // console.dir(data)
  speed.push(data)
})
// //////////////////////////////
// admin work
var name_interface = []
var nameinterface = new snmp.Session({ host: host, community: community })
var oid_nameinterface = '.1.3.6.1.2.1.2.2.1.2'
nameinterface.getSubtree({ oid: oid_nameinterface }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(data.value) 
    name_interface.push({interface: data.value})
  })
  nameinterface.close()
})

var type_interface = new snmp.Session({ host: host, community: community })
var oid_inter = '.1.3.6.1.2.1.2.2.1.3'
type_interface.getSubtree({ oid: oid_inter }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(data.value)
  })
  type_interface.close()
})

var type_mtu = new snmp.Session({ host: host, community: community })
var oid_mtu = '.1.3.6.1.2.1.2.2.1.4'
type_mtu.getSubtree({ oid: oid_mtu }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(data.value)
  })
  type_mtu.close()
})
var type_speed = new snmp.Session({ host: host, community: community })
var oid_speed = '.1.3.6.1.2.1.2.2.1.6'
type_speed.getSubtree({ oid: oid_speed }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(data.value)
  })
  type_speed.close()
})

var status = []
var type_status = new snmp.Session({ host: host, community: community })
var oid_status = '.1.3.6.1.2.1.2.2.1.8'
type_status.getSubtree({ oid: oid_status }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(data.value) 
    status.push({status: data.value})
  })
  type_status.close()
})

var time = []
var type_statusTime = new snmp.Session({ host: host, community: community })
var oid_statusTime = '.1.3.6.1.2.1.2.2.1.9'
type_statusTime.getSubtree({ oid: oid_statusTime }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(data.value)
    time.push({time: data.value})
  })
  type_statusTime.close()
})

var iproutetype = []
var iproute_type = new snmp.Session({ host: host, community: community })
var oid_iproute_type = '.1.3.6.1.2.1.4.21.1.8'
iproute_type.getSubtree({ oid: oid_iproute_type }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    iproutetype.push({type: data.value})
  })
  iproute_type.close()
})

var iprouteprotocol = []
var iproute_protocol = new snmp.Session({ host: host, community: community })
var oid_iproute_protocol = '.1.3.6.1.2.1.4.21.1.9'
iproute_protocol.getSubtree({ oid: oid_iproute_protocol }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    iprouteprotocol.push({protocol: data.value})
  // console.log(data.value)
  })
  iproute_protocol.close()
})
// ///////////////////////////////////////////////////////////////
app.get('/name', function (req, res) {
  res.send(vb)
})
app.get('/subnet', function (req, res) {
  res.send(subnet)
})
app.get('/iproute', function (req, res) {
  res.send(iproute)
})
app.get('/speed', function (req, res) {
  res.send(speed)
})
app.get('/vlan', function (req, res) {
  res.send(vlan)
})
app.get('/iproutetype', function (req, res) {
  res.send(iproutetype)
})
app.get('/iprouteprotocol', function (req, res) {
  res.send(iprouteprotocol)
})
app.get('/status', function (req, res) {
  res.send(status)
})
app.get('/interface', function (req, res) {
  res.send(name_interface)
})
app.get('/time', function (req, res) {
  res.send(time)
})
app.use(express.static('public'))
app.listen(7001, function () {
  console.log('Example app listening on port 7001!')
})
