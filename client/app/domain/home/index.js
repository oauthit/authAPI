'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routeConfig from './home.router';
import HomeController from './home.controller';

export default angular.module('authApiApp.home', [uirouter])
  .config(routeConfig)
  .controller('HomeController', HomeController)
  .name;
