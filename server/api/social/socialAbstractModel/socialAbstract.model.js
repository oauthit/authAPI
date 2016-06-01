'use strict';

var debug = require('debug')('authAPI:socialAbstract.model');
import findMethod from './find';

function model(modelName, friendModel, profileModel) {

  return function (req) {

    function find() {

      return findMethod(req, modelName, friendModel, profileModel);

    }

    function getFromApi(resolve, reject) {
      return function (id, providerToken, profileId) {
        try {
          providerToken = JSON.parse(providerToken);
        }
        catch (err) {
          debug('getFromApi', `Error occurred while parsing... Error message ${err}`);
          reject(err);
        }
        profileModel().getFromApi(id, providerToken.accessToken, profileId).then(function (res) {
          return resolve(res);
        }, function (err) {
          return reject(err);
        });
      }
    }


    function findById(id) {
      return new Promise(function (resolve, reject) {
        let profileId = req.user.profileId;
        let providerToken = req.providerToken;
        let getDataFromApi = getFromApi(resolve, reject);

        profileModel().getFromRedis(id).then(function (reply) {
          if (!reply) {
            return getDataFromApi(id, providerToken, profileId);
          }

          try {
            return resolve(reply);
          } catch (err) {
            return reject(err);
          }
        }, function () {
          return getDataFromApi(id, providerToken, profileId);
        });
      });
    }

    return {
      findAll: find,
      find: findById
    };

  }

}

export default model;
