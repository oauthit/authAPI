"use strict";

const debug = require('debug')('authAPI:modelSchema');

let models = {};

function registerModel(modelName) {
  models[modelName] = require('./' + modelName + '.model');
  debug('registerModel:', modelName);
}

export default {
  registerModel,
  model: function (name) {
    return models[name];
  },
  models
};
