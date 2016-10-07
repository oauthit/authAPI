'use strict';

import {Strategy as GoogleStrategy} from 'passport-google-oauth2';
import basePassportSetup from '../basePassportSetup';

export default basePassportSetup(GoogleStrategy);
