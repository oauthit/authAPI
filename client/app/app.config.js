'use strict';

export function routeConfig($urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

}

export function httpConfig($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push('errorInterceptor');
}

export function localStorageConfig(localStorageServiceProvider) {
  'ngInject';

  localStorageServiceProvider
    .setPrefix('authAPI');
}
