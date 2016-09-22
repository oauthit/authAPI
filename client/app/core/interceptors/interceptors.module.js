'use strict';

import angular from 'angular';

import {errorInterceptor} from './error.interceptor';

export default angular.module('authApiApp.core.interceptors', [])
  .factory('errorInterceptor', errorInterceptor);
