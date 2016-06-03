'use strict';

import abstractCtrl from '../abstract/abstract.jsdata.controller';
const debug = require('debug')('AuthAPI:providerApp.controller');
import {model} from '../../models/js-data/modelsSchema.service';
const ProviderAccount = model('providerAccount');
const ProviderApp = model('providerApp');
import co from 'co';

let ctrl = abstractCtrl(ProviderApp);

function setReq(req) {
  if (!req.params) {
    req.params = {};
  }
  req.params.id = req.user && req.user.id || 0;
  return req;
}

ctrl.index = function (req, res) {

  debug('index:', 'req.user', req.user);
  console.log('req.user:', req.user);

  const account = req && req.user && req.user.tokenInfo;
  const accountId = account.id;
  let providerApps = [];

  co(function *() {
    let providerAccounts = yield ProviderAccount.findAll({accountId: accountId});
    //providerAccounts should contain olny one record ProviderAccount have only one Account

    console.log('providerAccounts:', providerAccounts);

    if (providerAccounts) {

      for(let i = 0; i < providerAccounts.length; i++) {

        console.log(providerAccounts[i]);
        let providerApp = yield ProviderApp.find(providerAccounts[i].providerAppId);
        providerApps.push(providerApp);
      }
    }

    console.log('providerApp', providerApps);

    return res.json(providerApps);

  }).catch((err) => {
    debug('err:', err);
    return res.sendStatus(err);
  });

};

ctrl.show = function (req, res) {
  debug('show:', 'req.user', req.user);

  return res.json();
};

debug('ctrl.index:', ctrl.index);

export default ctrl;
