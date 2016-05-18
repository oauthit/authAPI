/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /admin/provider              ->  index
 * POST    /admin/provider              ->  create
 * GET     /admin/provider/:id          ->  show
 * PUT     /admin/provider/:id          ->  update
 * DELETE  /admin/provider/:id          ->  destroy
 */

'use strict';

import Org from '../../../models/org.model.js';
import abstractController from '../../abstract/abstract.controller';

export default abstractController(Org);
