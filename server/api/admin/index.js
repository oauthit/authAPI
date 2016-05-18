'use strict';

var express = require('express');
var router = express.Router();
import STAPI from '../abstract/abstract.model';

router.get('/:tableName', (req, res) => {
  STAPI('/opr/' + req.params.tableName)().find().then((socialAccounts) => {
      return res.json(socialAccounts);
    })
});

module.exports = router;
