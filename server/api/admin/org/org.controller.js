/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /admin/org              ->  index
 * POST    /admin/org              ->  create
 * GET     /admin/org/:id          ->  show
 * PUT     /admin/org/:id          ->  update
 * DELETE  /admin/org/:id          ->  destroy
 */

'use strict';


import Org from '../../../models/org.model.js';
import {stapiBaseController} from 'sistemium-node';

export default stapiBaseController(Org);
