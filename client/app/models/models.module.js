'use strict';

import angular from 'angular';

import services from '../core/services/services.module';

import Account from './account.model';
import App from './app.model';
import Org from './org.model';
import OrgAccount from './orgAccount.model';
import OrgAccountRole from './orgAccountRole.model';
import OrgRole from './orgRole.model';
import OrgApp from './orgApp.model';
import OrgProviderApp from './orgProviderApp.model';
import ProviderAccount from './providerAccount.model';
import ProviderApp from './providerApp.model';
import Role from './role.model';
import SocialAccount from './socialAccount.model';

export default angular.module('authApiApp.models', [services])
  .config(function (DSHttpAdapterProvider) {
    angular.extend(DSHttpAdapterProvider.defaults, {
      basePath: '/api'
    });
  })
  .run(Account)
  .run(App)
  .run(Org)
  .run(OrgAccount)
  .run(OrgAccountRole)
  .run(OrgRole)
  .run(OrgApp)
  .run(OrgProviderApp)
  .run(ProviderAccount)
  .run(ProviderApp)
  .run(Role)
  .run(SocialAccount)


