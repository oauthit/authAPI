'use strict';

import {Strategy as vkontakteStrategy} from 'passport-vkontakte';
import basePassportSetup from '../basePassportSetup';

export default basePassportSetup(vkontakteStrategy);
