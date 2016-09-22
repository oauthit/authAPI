'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routeConfig from './org.router';
import OrgsController from './orgs.controller';

export default angular.module('authApiApp.organization', [uirouter])
  .config(routeConfig)
  .controller('OrgsController', OrgsController)
  .name;
