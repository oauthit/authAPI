'use strict';

let ns = 'AuthAPI:api:providerApp:controller';

import abstractCtrl from '../abstract/abstract.jsdata.controller';
const debug = require('debug')(ns);
import {model} from '../../models/js-data/storeSchema';

const ProviderAccount = model('ProviderAccount');
const ProviderApp = model('ProviderApp');
import co from 'co';

let ctrl = abstractCtrl(ProviderApp);

ctrl.privateFindAll = function (req, res) {

  debug('privateFindAll user:', req.user);

  const account = req && req.user && req.user.tokenInfo;
  const accountId = account.id;

  co(function *() {
    let providerApps = [];
    let providerAccounts = yield ProviderAccount.findAll({accountId: accountId});
    //providerAccounts should contain only one record ProviderAccount have only one Account

    debug('privateFindAll providerAccounts:', providerAccounts);

    if (providerAccounts) {
      for (let i = 0; i < providerAccounts.length; i++) {
        let providerApp = yield ProviderApp.find(providerAccounts[i].providerAppId);
        providerApps.push(providerApp);
      }
    }

    return res.json(providerApps);

  }).catch((err) => {
    console.error(ns, err);
    return res.sendStatus(err);
  });

};

ctrl.publicFindAll = function (req, res) {

  ProviderApp.findAll()
    .then((providerApps) => {

      return res.json(providerApps.map((pa) => {
        return {
          id: pa.id,
          name: pa.name,
          provider: pa.provider,
          code: pa.code
        };
      }));
    })
    .catch(err => {
      console.error(ns, err);
      return res.sendStatus(500);
    });

};

ctrl.show = function (req, res) {
  debug('show: user:', req.user);
  return res.json();
};

export default ctrl;
