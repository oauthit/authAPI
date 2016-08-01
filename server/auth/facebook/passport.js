'use strict';

import {Strategy as FacebookStrategy} from 'passport-facebook';
import basePassportSetup from '../basePassportSetup';

export default basePassportSetup(FacebookStrategy);
