"use strict";

const debug = require('debug')('authAPI:modelSchema');

let models = {};

function registerModel(modelName) {
  models[modelName] = require('./' + modelName + '.model');
  debug('registerModel:', modelName);
}

function model(name) {
  return models[name];
}

export default {registerModel, model};
