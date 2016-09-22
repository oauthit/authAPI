'use strict';

import angular from 'angular';

import {Auth} from './domain/Auth.service';
import {InitCtrlService} from './domain/InitCtrl.service';
import {SettingsService} from './domain/settings.service';
import {schema} from './domain/schema.service';

export default angular.module('authApiApp.core.services', [
    'sistemiumAngularAuth'
  ])
  .factory('Auth', Auth)
  .factory('InitCtrlService', InitCtrlService)
  .factory('SettingsService', SettingsService)
  .service('schema', schema);
