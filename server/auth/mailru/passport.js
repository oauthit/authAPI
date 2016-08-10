'use strict';

import {Strategy as mailruStrategy} from 'passport-mailru';
import basePassportSetup from '../basePassportSetup';

export default basePassportSetup(mailruStrategy);
