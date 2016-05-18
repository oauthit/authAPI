/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/agent              ->  index
 * POST    /api/agent              ->  create
 * GET     /api/agent/:id          ->  show
 * PUT     /api/agent/:id          ->  update
 * DELETE  /api/agent/:id          ->  destroy
 */

'use strict';

import Agent from './../../models/agent.model.js';
import abstractController from '../abstract/abstract.controller';

export default abstractController(Agent);
