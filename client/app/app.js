'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiRouterStateHelper from 'angular-ui-router.statehelper';
import localStorageModule from 'angular-local-storage';
import formly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';
import cgBusy from 'angular-formly-templates-bootstrap';
import ngSanitize from 'angular-sanitize';
import angularMoment from 'angular-moment';
import uiSelect from 'ui-select';

import {routeConfig, httpConfig, localStorageConfig} from './app.config';

import authApiCore from './core/core.module';
import models from './models/models.module';
import constants from './app.constant';

angular.module('authApiApp', [
  uiRouter,
  uiRouterStateHelper,
  localStorageModule,
  formly,
  formlyBootstrap,
  cgBusy,
  'sistemium',
  'sistemiumAngularAuth',
  'sistemiumBootstrap',
  ngSanitize,
  angularMoment,
  uiSelect,
  authApiCore,
  models,
  // 'authApiApp.admin',
  constants
])
  .config(routeConfig)
  .config(httpConfig)
  .config(localStorageConfig)
  .value('cgBusyDefaults',{
    message: 'Loading data ...',
    templateUrl: 'components/cg-busy/busy.html'
  })
  .run(function ($rootScope, sabErrorsService, schema) {

    //add function to $rootScope to add errors
    $rootScope.addError = function (error) {
      sabErrorsService.addError(error);
    };

    $rootScope.$on('logged-in', function (e) {
      console.log('event:', e);
      var Org = schema.model('Org');
      Org.findAll();
    });
  })
  .config(require('./domain/account/account.router'))
  .controller('AccountController', require('./domain/account/account.controller'))
  .config(require('./domain/home/home.router'))
  .controller('HomeController', require('./domain/home/home.controller'))
  .config(require('./domain/organizations/org.router'))
  .controller('OrgsController', require('./domain/organizations/orgs.controller'))
  .config(require('./domain/organizations/organizationInfo/orgInfo.router'))
  .controller('OrgRolesController', require('./domain/organizations/organizationInfo/orgRoles.controller'))
  .controller('OrgInfoController', require('./domain/organizations/organizationInfo/orgInfo.controller'))
  .controller('OrgCreateController', require('./domain/organizations/create/orgCreate.controller'))
  .controller('OrgJoinPublicController', require('./domain/organizations/joinPublic/joinPublic.controller'))
  .controller('OrgAccountController', require('./domain/organizations/organizationInfo/orgAccount.controller'))
  .component('createApp', require('./domain/organizations/organizationInfo/createApp.component'))
  .config(require('./domain/providerApps/providerApp.router'))
  .controller('ProviderAppController', require('./domain/providerApps/providerApp.controller'))
  .controller('AddProviderAppController', require('./domain/providerApps/addProviderApp.controller'))
  .config(require('./domain/providerApps/providerAppAccounts/providerAppAccounts.router'))
  .controller('ProviderAppAccountsController', require('./domain/providerApps/providerAppAccounts/providerAppAccounts.controller'));









