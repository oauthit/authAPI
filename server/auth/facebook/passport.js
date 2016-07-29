'use strict';

import {Strategy as FacebookStrategy} from 'passport-facebook';
var debug = require('debug')('authAPI:facebook/passport');
// import refresh_token from '../../api/social/facebook/refreshToken.service';
import basePassportSetup from '../basePassportSetup';

export default basePassportSetup(FacebookStrategy);
