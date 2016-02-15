'use strict';
import request from 'request';
var _ = require('lodash');
var debug = require('debug')('authAPI:abstract.model');

function model(name) {

  var collectionUrl = process.env.STAPI + name;

  function find(options) {
    return new Promise(function (resolve, reject) {

      let url = collectionUrl;

      if (typeof options === 'string') {
        url += '/' + options;
        options = undefined;
      }

      //debug ('find', options);
      //debug ('find', url);

      request({
        url: url,
        qs: options && options.params || options,
        json: true
      }, function (err, res, body) {

        //debug ('find',body);
        if (err) {
          return reject(err);
        }

        if (!body) {
          return resolve([]);
        }

        try {
          resolve(body.length ? body : [body]);
        } catch (err) {
          reject(err);
        }

      });

    });
  }

  function findOne(options) {
    //debug ('findOne',options);
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

    return new Promise((resolve, reject) => {
      findOne(params).then(body => {

        if (body) {
          resolve(body);
        } else {
          save(_.defaults(data, params)).then(resolve, reject);
        }

      }, reject);
    });

  }

  function findById(id) {
    return findOne(id);
  }

  return {
    find: find,
    findOne: findOne,
    findById: findById,
    save: save,
    getOrCreate: getOrCreate
  };

}

export default model;
