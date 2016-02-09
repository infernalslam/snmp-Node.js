    var express = require('express')
    var app = express()
    var snmp = require('snmp-native')
    var util = require('util')
    var bodyParser = require('body-Parser')
    var host = '10.4.15.1' //fitmwifi
    //10.4.15.1
    //10.12.160.1
    var community = 'public'
    ///json
    var session = new snmp.Session({ host: host, community: community })
    var oid = [1, 3, 6, 1, 2, 1, 1, 1, 0];
    var Name
    var vb

        Name = session.get({ oid: oid }, function (err, varbinds) {
                 if (err) {
                     console.log(err)
                 } else {
                     vb = varbinds[0]
                    //console.log('The system description is "' + vb.value + '"')
                 }
                      session.close();
          })//exit order

      var Subtree = []
      var oidStr = '.1.3.6.1.2.1.31.1.1.1.1'
      oid = oidStr
      .split('.')
      .filter(function (s) { 
          return s.length > 0 
        })
      .map(function (s) { 
          return parseInt(s, 10) 
        })

      var session2 = new snmp.Session({ host: host, community: community })
          session2.getSubtree({ oid: oid }, function (err, varbinds) {
         if (err) {
          console.log(err)
         } else {  
          varbinds.forEach(function (vb) {
            var data = {
                name   : vb,
                detail : vb.oid[vb.oid.length - 1] ,
                vb     : vb.value
            }
            Subtree.push(data)

            //console.log(vb)
            //console.log('Name of interface ' + vb.oid[vb.oid.length - 1]  + ' is "' + vb.value + '"')
         })
      }

        session2.close()
    })


          /*var session3 = new snmp.Session({ host: host, community: community })
          var oids = [[1, 3, 6, 1, 2, 1, 1, 1, 0], [1, 3, 6, 1, 2, 1, 1, 2, 0]]
          session3.getAll({ oids: oids }, function (err, varbinds) {
              varbinds.forEach(function (vb) {
                  console.log(vb.oid + ' = ' + vb.value)
              })
              session3.close()
          })*/
        /*var session4 = new snmp.Session({ community: community }) // New session without host parameter. We set community to avoid repeating it later.
        var oid = [1, 3, 6, 1, 2, 1, 1, 1, 0]; // sysDescr.0
        var cnt = 254; // Expected number of callbacks.
        for (var i = 1; i < 255; i++) {
        (function (host) {
                session4.get({ oid: oid, host: host }, function (err, vbs) {
                    if (err) {
            console.log('Error for ' + host + ': ' + err)
                    } else {
            var vb = vbs[0]
                        console.log(host + ': ' + vb.oid + ' = ' + vb.value)
                    }
            if (--cnt === 0) {
         session4.close()
                    }
                })
            }('10.12.161.' + i))
        }*/

          app.get('/name', function (req, res) {
             res.send(vb)
          })
          app.get('/Subtree', function (req, res){
             res.send(Subtree)
          })
          app.use(express.static('public'))
          //app.use('/' , data)
          

          app.listen(7001, function () {
            console.log('Example app listening on port 7001!');
          })
