'use strict';
import request from 'request';
var _ = require ('lodash');
var debug = require ('debug') ('authAPI:providerAccount.model');

var collectionUrl = process.env.STAPI + '/aa/providerAccount';

function find(options) {
  return new Promise(function (resolve, reject) {

    let url = collectionUrl;

    if (typeof options === 'string') {
      url += '/' + options;
      options = undefined;
    }

    request({
      url: url,
      qs: options.params || options
    }, function (err, res, body) {

      if (err) {
        return reject(err);
      }

      if (!body) {
        return resolve([]);
      }

      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }

    });

  });
}

function findOne(options) {
  return new Promise((resolve, reject) => {

    find(options).then(reply => {
      reply && reply.length && resolve(reply[0]) || resolve(false);
    }, reject);

  });
}

function save(body) {
  return new Promise(function (resolve, reject) {

    request.post({
      url: collectionUrl,
      json: body
    }, function (err) {
      err && reject(err) || resolve(body);
    });

  });
}

function getOrCreate(params, data) {

  return new Promise ((resolve, reject) => {
    findOne(params).then(body => {

      if (body) {
        resolve(body);
      } else {
        save(_.defaults (data,params)).then(resolve,reject);
      }

    },reject);
  });

}

export default {
  find: find,
  findOne: findOne,
  save: save,
  getOrCreate: getOrCreate
};
