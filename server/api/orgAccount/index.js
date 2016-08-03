'use strict';

import {setAccount} from '../../middleware/authHelpers.middleware';
import stapiOrgAccount from './../../models/orgAccount.model.js';

var express = require('express');
var controller = require('./orgAccount.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

function checkIfAlreadyMember (req, res, next) {

  stapiOrgAccount(req)
    .find({
      orgId: req.body.orgId,
      accountId: req.query.accountId
    })
    .then((orgAccounts)=>{
      if (orgAccounts.length){
        req.params.id = orgAccounts[0].id;
      }
      next();
    });

}
router.post('/', setAccount, checkIfAlreadyMember, controller.create);
router.put('/:id', setAccount, checkIfAlreadyMember, controller.create);

module.exports = router;
