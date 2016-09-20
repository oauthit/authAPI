'use strict';

(function () {

  angular.module('authApiApp').component('createApp', {
    templateUrl: 'app/domain/organizations/organizationInfo/createApp.html',
    controller: function ($ngRedux, saFormlyConfigService) {
      let self = this;

      angular.extend(self, {
        fields: saFormlyConfigService.getConfigFieldsByKey('appCreateFields'),
        mapStateToThis: function (state) {
          return {
            counter: state.counter
          };
        }
      });

      let unsubscribe = $ngRedux.connect(self.mapStateToThis, {increment, decrement})(self);

      $ngRedux.subscribe(() => {
        console.log('STATE:', $ngRedux.getState());
        console.log('vm.counter:', self.counter);
      });

      self.$onDestroy = unsubscribe;

      // what if I want to increment the counter as soon as the controller is created ?
      // self.increment();
    },
    controllerAs: 'vm'
  })
  ;

})();
