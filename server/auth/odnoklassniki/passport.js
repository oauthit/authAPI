'use strict';

import {Strategy as OdnoklassnikiStrategy} from 'passport-odnoklassniki';
import basePassportSetup from '../basePassportSetup';

export default basePassportSetup(OdnoklassnikiStrategy);
