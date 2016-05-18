'use strict';

import socialAccount from './socialAccountSTAPI.model.js';
import providerAccount from '../../../models/providerAccount/oprProviderAccount.model.js';
import abstractController from '../../abstract/abstract.controller';
var debug = require('debug')('authAPI:socialAccount.controller');
import uuid from 'node-uuid';

let ctrl = abstractController(socialAccount);

Object.assign(ctrl, {
  index: function (req, res) {
    let query = req.query;
    socialAccount(req).find(query).then((reply) => {
      if (reply && reply.length === 0 ) {
        //if not found in socialAccount search providerAccount
        providerAccount(req).find(query).then((reply) => {
          if (reply && reply.length === 0) {
            return res.json([]);
          } else {
            let data = {
              id: uuid.v4(),
              profileId: reply[0].profileId,
              name: reply[0].name,
              provider: reply[0].provider
            };
            debug('data', data);
            socialAccount(req).save(data).then(() => {
              return res.json(data);
            }).catch((err) => {
              debug('error while saving socialAccount', err);
              return res.status(500);
            });
          }
        });
      } else {
        debug('social account:', reply);
        return res.json(reply);
      }
    }).catch((err) => {
      debug('error in index', err);
      return res.status(500);
    });
  }
});
export default ctrl;
