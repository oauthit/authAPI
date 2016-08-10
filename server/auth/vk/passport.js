'use strict';

import {Strategy as VkontakteStrategy} from 'passport-vkontakte';
import basePassportSetup from '../basePassportSetup';

export default basePassportSetup(VkontakteStrategy);
