'use strict';

import express from 'express';
var router = express.Router();
import numberProcessor from './numberProcessor.controller';
import smsProcessor from './smsProcessor.controller';

var success = function (req,res) {

  if (req.authInfo) {
    res.set('X-Access-Token',req.authInfo);
    res.json(req.user);
  }

};

router
  .get ('/:mobileNumber', numberProcessor)
  .get ('/:authToken/:smsCode', smsProcessor, success)
  .get ('/:mobileNumber/:authToken/:smsCode', smsProcessor, success);

export default router;
