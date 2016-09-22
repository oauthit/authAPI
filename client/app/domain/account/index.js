'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routeConfig from './account.router';
import AccountController from './account.controller';

export default angular.module('authApiApp.account', [uirouter])
  .config(routeConfig)
  .controller('AccountController', AccountController)
  .name;
