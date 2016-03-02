'use strict';

(function () {

  angular.module('authApiApp')
    .controller('ContactListCtrl', function (
      $scope,
      $state,
      Agent,
      CounterAgent,
      Invite,
      ErrorsService,
      InitCtrlService
    ) {

      var vm = InitCtrlService.setup(this);

      angular.extend(vm,{

        buttons: [{
          name: 'Add a contact',
          sref: 'debt.contact.add'
        }]

      });

      vm.onSetAgent = function (agent) {
        vm.contacts = agent.contacts;
        vm.busy = Agent.loadRelations(agent,'contact').then(function(){
          vm.contacts = agent.contacts;
        });
      };

      InitCtrlService.init (vm,$scope);
      // TODO need to union promises to rid of flickering on first load
      vm.busy = CounterAgent.findAll();

    })
  ;

}());
