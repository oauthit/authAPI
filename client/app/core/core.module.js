'use strict';

import angular from 'angular';

import interceptors from './interceptors/interceptors.module';
import services from './services/services.module';

export default angular.module('authApiApp.core', [
    interceptors,
    services
  ]);
