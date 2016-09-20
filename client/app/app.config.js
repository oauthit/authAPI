'use strict';

let INCREMENT = 'INCREMENT';
let DECREMENT = 'DECREMENT';

function increment() {
  return {
    type: INCREMENT
  };
}

function decrement() {
  return {
    type: DECREMENT
  };
}

(function () {

  function counter(state = 1, action) {
    switch (action.type) {
      case INCREMENT:
        return ++state;

      case DECREMENT:
        return --state;

      default:
        return state;
    }
  }


  angular.module('authApiApp')
    .config(function ($httpProvider, $urlRouterProvider, localStorageServiceProvider, $ngReduxProvider) {


      let reducer = Redux.combineReducers({counter: counter});
      $ngReduxProvider.createStoreWith(reducer);
      $httpProvider.interceptors.push('errorInterceptor');

      $urlRouterProvider
        .otherwise('/');

      localStorageServiceProvider
        .setPrefix('authAPI');
    })
    .value('cgBusyDefaults',{
      message: 'Loading data ...',
      templateUrl: 'components/cg-busy/busy.html'
    })
  ;

}());
