'use strict';

var Waterline = require('waterline');
var config = require('../config/environment');
var orm = new Waterline();

var fs = require('fs');
var path = require('path');

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') === -1;
  })
  .forEach(function(file) {
    var modelPath = path.join(__dirname, file, file + '.model.js');

    if(fs.existsSync(modelPath)) {
      orm.loadCollection(require(modelPath));
    }
  });

module.exports = {waterline: orm, config: config.waterline};
