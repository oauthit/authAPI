'use strict';
import request from 'request';

function getProviderAccount(options) {
  return new Promise(function (resolve, reject) {
    request({
      url: 'http://localhost:9000/api/aa/providerAccount',
      qs: {
        provider: options.provider,
        profileId: options.profileId
      }
    }, function (err, res, body) {
      if (err) {
        reject(err);
      }

      resolve(body);
    });
  });
}

function createProviderAccount(body) {
  return new Promise(function (resolve, reject) {
    let postBody = {
      provider: body.provider,
      profileId: body.profileId,
      profileData: body.profileData,
      name: body.name
    };

    request.post({
      url: 'http://localhost:9000/api/aa/providerAccount',
      form: postBody
    }, function (err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

export default {
  find: getProviderAccount,
  save: createProviderAccount
};
