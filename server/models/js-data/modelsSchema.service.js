"use strict";

let models = {};

function registerModel(modelName) {
  models[modelName] = require('./' + modelName + '.model');
}

export default {
  registerModel,
  models
}
