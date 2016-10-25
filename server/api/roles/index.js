'use strict';

import _ from 'lodash';
import express from 'express';
import {stapiBaseController, baseStapiModel} from 'sistemium-node';

var router = express.Router();
var model = baseStapiModel('/aa/orgAccountRoleHelper');

var ctrl = stapiBaseController(req => {

  req.query['x-page-size:'] = 100;
  req.query['x-start-page:'] = 1;

  return {
    find: () => model(req).find()
      .then(response => {
        var grouped = _.groupBy(response, 'code');
        var res = {};
        _.each(grouped, (values, code) => {
          var value = _.map(values, value => value.value || true);
          res[code] = value.length === 1 ? value[0] : value;
        });
        return res;
      })
  };
  
});

router.get('/', ctrl.index);

module.exports = router;
