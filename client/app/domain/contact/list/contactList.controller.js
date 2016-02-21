'use strict';

(function () {

  angular.module('authApiApp')
    .controller('ContactListCtrl', function (
      $scope,
      $state,
      Agent,
      CounterAgent,
      Invite,
      SettingsService,
      ErrorsService,
      InitCtrlService
    ) {

      var vm = this;

      angular.extend(vm,{

        buttons: [{
          name: 'Add a contact',
          sref: 'debt.contact.add'
        }]

      });

      InitCtrlService.init(vm);
      CounterAgent.findAll();

      function setAgent(e, agent) {
        if (!agent) {
          return;
        }
        vm.contacts = agent.contacts;
        Agent.loadRelations(agent,'contact').then(function(){
          vm.contacts = agent.contacts;
        });
      }

      setAgent(false, SettingsService.getCurrentAgent());

      $scope.$on('current-agent', setAgent);

    })
  ;

}());
