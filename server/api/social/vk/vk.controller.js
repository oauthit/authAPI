'use strict';

import {stapiBaseController} from 'sistemium-node';
import socialAccount from '../../../models/socialAccount.model';
import {getSocialFriends} from '../social.controller';
import fetch from './fetch';
import parse from './parse';

let ctrl = stapiBaseController(socialAccount);

ctrl.index = getSocialFriends(fetch, parse, 'vkontakte');
export default ctrl;
