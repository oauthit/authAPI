'use strict';

import STAPI from '../../../models/abstract.model.js';

/**
 *
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 *
 * @return {Response} - Sends JSON response with entities
 */
export function index (req, res) {
  STAPI('/opr/' + req.params.tableName)().find().then((entities) => {
    return res.json(entities);
  })
}
