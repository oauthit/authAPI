'use strict';

import {Strategy as TwitterStrategy} from 'passport-twitter';
import basePassportSetup from '../basePassportSetup';

export default basePassportSetup(TwitterStrategy);
