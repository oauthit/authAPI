'use strict';

import stapiOrgAccount from './../../models/orgAccount.model.js';
import stapiOrgAccountRole from './../../models/orgAccountRole.model';
import stapiRole from './../../models/role.model';
import _ from 'lodash';
import {stapiBaseController} from 'sistemium-node';

let ctrl = stapiBaseController(stapiOrgAccount);

ctrl.indexWithRoles = function (req, res) {

  stapiOrgAccount(req).find({
    orgId: req.query.orgId,
    accountId: req.query.accountId
  }).then(orgAccounts => {
    let promises = [];

    orgAccounts.forEach(orgAccount => {
      promises.push(stapiOrgAccountRole(req).find({
        orgId: orgAccount.orgId,
        accountId: orgAccount.accountId
      }));
    });

    Promise.all(promises).then(orgAccountRoles => {

      let promises = [];
      orgAccountRoles.forEach(orgAccountRole => {
        if (orgAccountRole.length === 0) return;
        promises.push(stapiRole(req).findById(orgAccountRole[0].roleId), orgAccountRole[0]);
      });

      Promise.all(promises).then(rolesWithOrgAccountRoles => {

        let orgAccountRoles = rolesWithOrgAccountRoles.filter((v, i) => i % 2 === 1);
        let roles = rolesWithOrgAccountRoles.filter((v, i) => i % 2 === 0);

        orgAccounts = _.map(orgAccounts, orgAccount => {
          orgAccount.roles = _.filter(roles, (role) => {
            let  filteredOrgAccountRoles = _.filter(orgAccountRoles, {
              orgId: orgAccount.orgId,
              accountId: orgAccount.accountId
            });

            let roleIds = _.map(filteredOrgAccountRoles, 'roleId');
            return _.includes(roleIds, role.id);
          });

          orgAccount.roles = _.reduce(orgAccount.roles, (prev, next) => {
            let itemInArray = _.find(prev, (o) => o.id === next.id);
            if (!itemInArray) {
              return prev.concat([next]);
            }
            return prev;
          }, []);

          return orgAccount;
        });

        return res.json(orgAccounts);
      });

    });

  });

};

export default ctrl;
