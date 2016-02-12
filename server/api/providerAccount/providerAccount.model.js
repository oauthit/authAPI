'use strict';
import request from 'request';

function find(options) {
  return new Promise(function (resolve, reject) {
    request({
      url: 'http://localhost:9000/api/aa/providerAccount',
      qs: options
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
    getProviderAccount(options).then((reply) => {
      if (reply && reply.length === 0) {
        return resolve(false);
      }
      resolve(reply[0]);
    }, (err) => {
      reject(err);
    });
  });
}

function save(body) {
  return new Promise(function (resolve, reject) {
    let postBody = {
      provider: body.provider,
      profileId: body.profileId,
      profileData: body.profileData,
      name: body.name
    };

    request.post({
      url: 'http://localhost:9000/api/aa/providerAccount',
      json: postBody
    }, function (err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

export default {
  find: find,
  findOne: findOne,
  save: save
};
