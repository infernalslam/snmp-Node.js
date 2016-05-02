;(function () {
  'use strict'
  var modelName = 'data'
  var mongoose = require('mongoose')
  var Schema = mongoose.Schema
  var schema = new Schema({
    speeds: {
      download: Number,
      upload: Number,
      originalDownload: Number,
      originalUpload: Number
    },
    client: {
      ip: String,
      lat: Number,
      lon: Number,
      isp: String,
      isprating: Number,
      rating: Number,
      ispdlavg: Number,
      ispulavg: Number
    },
    server: {
      host: String,
      lat: Number,
      lon: Number,
      location: String,
      country: String,
      cc: String,
      sponsor: String,
      distance: Number,
      distanceMi: Number,
      ping: Number,
      id: String
    }
  })

  module.exports = mongoose.model(modelName, schema)
})()
