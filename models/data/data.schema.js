;(function () {
  'use strict'
  var modelName = 'data'
  var mongoose = require('mongoose')
  /*test*/

  var Schema = mongoose.Schema

  var schema = new Schema({

     type : String,
     value: String,
     oid  : String,
     requestId :Number,
     receiveStamp : Number,
     sendStamp : Number


  })



  module.exports = mongoose.model(modelName, schema)
})()
