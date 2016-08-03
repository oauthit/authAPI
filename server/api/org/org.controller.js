'use strict';

import stapiOrg from './../../models/org.model.js';
import orgAccountRole from './../../models/orgAccountRole.model.js';
import orgAccount from './../../models/orgAccount.model.js';
import {stapiBaseController} from 'sistemium-node';

let ctrl = stapiBaseController(stapiOrg);

function index(req, res) {
  ctrl.index(req, res);
}

function show(req, res) {
  ctrl.show(req, res);
}

function create(req, res) {
  ctrl.create(req, res, org => {

      return Promise.all([
        orgAccountRole(req).save({
          orgId: org.id,
          accountId: req.user.id,
          // TODO: get public roles at bootstrap
          roleId: '08af0df4-588d-11e6-8000-e188647b398f'
        }), orgAccount(req).save({
          orgId: org.id,
          accountId: req.user.id,
          name: req.user.name
        })
      ]).then(() => {
        return org;
      });

    }
  );
}

export default {index, show, create};
