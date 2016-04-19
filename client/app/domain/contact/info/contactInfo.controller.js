'use strict';

(function () {

  angular.module('authApiApp')
    .controller('ContactInfoCtrl', function ($stateParams,
                                             $state,
                                             Modal,
                                             Contact,
                                             saFormlyConfigService,
                                             sabErrorsService) {

      var vm = this;

      var contactId = $stateParams.id;

      angular.extend(vm, {

        buttons: [{
          name: 'Remove contact',
          fn: function () {
            Modal.confirm.delete(function () {
              vm.busy = Contact.destroy(contactId).then(function () {
                $state.go('^.list');
              }, function (err) {
                sabErrorsService.addError(err);
              });
            })(vm.contact.counterAgent.name);
          }
        }]
      });

      vm.busy = Contact.find(contactId).then(function (c) {

        Contact.loadRelations(c).then(function (r) {
          vm.contact = r;
          vm.fields = saFormlyConfigService.getConfigFieldsByKey('contact');
        }, function (err) {
          sabErrorsService.addError(err);
        });

      }, function (err) {
        sabErrorsService.addError(err);
      });

    })
  ;

}());
