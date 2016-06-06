'use strict';

import Org from './../../models/js-data/org.model';
import OrgAccount from './../../models/js-data/orgAccount.model';
import App from './../../models/js-data/app.model';
import abstractCtrl from '../abstract/abstract.jsdata.controller';
import co from 'co';

let ctrl = abstractCtrl(Org);

ctrl.findAll = (req, res) => {

  co(function *() {

    let account = req && req.user && req.user.tokenInfo;

    let orgAccounts = yield OrgAccount.findAll({accountId: account.id});

    let orgs = [];
    if (orgAccounts) {
      for (let i = 0; i < orgAccounts.length; i++) {
        let org = yield Org.find(orgAccounts[i].orgId);
        orgs.push(org);
      }
    }

    let apps = [];
    if (orgs) {
      for (let i = 0; i < orgs.length; i++) {
        let app = yield App.find(orgs[i].orgId);
        apps.push(app);
      }
    }

    return res.json(orgs);

  }).catch((err) => {
    console.log(err);
    return res.sendStatus(500);
  });

};

export default ctrl;
