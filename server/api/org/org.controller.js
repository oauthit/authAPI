'use strict';

import stapiOrg from './../../models/org.model.js';
import orgAccountRole from './../../models/orgAccountRole.model.js';
import orgAccount from './../../models/orgAccount.model.js';
import orgRole from './../../models/orgRole.model.js';
import role from './../../models/role.model.js';
import {stapiBaseController} from 'sistemium-node';

let ctrl = stapiBaseController(stapiOrg);

export default {index, show, create, destroy};

function destroy(req, res) {
  ctrl.destroy(req, res);
}

function index(req, res) {
  ctrl.index(req, res);
}

function show(req, res) {
  ctrl.show(req, res);
}

function create(req, res, next) {

  req.onStapiSuccess = org => {

    return new Promise(function (resolve, reject) {

      role(req).findOne({code: 'admin'})
        .then((role) => {
          return Promise.all([
            orgRole(req).save({
              orgId: org.id,
              roleId: role.id
            }),
            orgAccountRole(req).save({
              orgId: org.id,
              accountId: req.user.id,
              // TODO: get public roles at bootstrap
              roleId: role.id
            }), orgAccount(req).save({
              orgId: org.id,
              accountId: req.user.id,
              name: req.user.name
            })
          ]).then(() => {
            return resolve(org);
          }).catch(err => {
            return reject(err);
          });
        })
        .catch(err => {
          return reject(err);
        })
      ;

    });

  };

  ctrl.create(req, res, next);
}
