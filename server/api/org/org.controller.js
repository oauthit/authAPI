'use strict';

import stapiOrg from './../../models/org.model.js';
import orgAccountRole from './../../models/orgAccountRole.model.js';
import {stapiBaseController} from 'sistemium-node';

let ctrl = stapiBaseController(stapiOrg);

function findAll(req, res) {
  if (!req.query.isPublic) {
    req.query.accountId = req.user.id;
  }
  ctrl.index(req, res);
}

function find(req, res) {
  req.query.accountId = req.user.id;
  ctrl.show(req, res);
}

function create(req, res) {
  ctrl.create(req, res, org =>

    orgAccountRole(req).save({
      orgId: org.id,
      accountId: req.user.id,
      // TODO: get public roles at bootstrap
      roleId: '08af0df4-588d-11e6-8000-e188647b398f'
    })

  );
}

export default {findAll, find, create};
