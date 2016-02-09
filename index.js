    var express = require('express')
    var app = express()
    var snmp = require('snmp-native')
    var util = require('util')
    var bodyParser = require('body-Parser')
    var host = '10.4.15.1'; //fitmwifi
    //10.4.15.1
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
                    console.log('The system description is "' + vb.value + '"')
                 }
                      session.close();
          })//exit order
        
          app.get('/data', function (req, res) {
             res.send(vb)
          })
          app.use(express.static('public'))
          //app.use('/' , data)
          

          app.listen(7001, function () {
            console.log('Example app listening on port 7001!');
          })
