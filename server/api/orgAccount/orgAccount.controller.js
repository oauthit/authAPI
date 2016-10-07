'use strict';

import stapiOrgAccount from './../../models/orgAccount.model.js';
import stapiOrgAccountRole from './../../models/orgAccountRole.model';
import stapiRole from './../../models/role.model';
import _ from 'lodash';
import {stapiBaseController} from 'sistemium-node';

let ctrl = stapiBaseController(stapiOrgAccount);

export default ctrl;
