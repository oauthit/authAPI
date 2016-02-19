'use strict';

(function () {

  angular.module('authApiApp')
    .controller('ContactListCtrl', function ($scope,
                                             $state,
                                             Agent,
                                             CounterAgent,
                                             Invite,
                                             SettingsService,
                                             ErrorsService,
                                             InitCtrlService) {

      var vm = this;

      CounterAgent.findAll();

      angular.extend(InitCtrlService.init(vm), {
        contacts: [],
        createInvite: function () {
          //TODO change with spinner
          vm.spinner = 'spinner started';
          Invite.create({
            ownerId: SettingsService.getCurrentAgent().id
          }).then(function (response) {
            vm.spinner = 'spinner stopped';
            $state.go('debt.invite.info', {id: response.id});
          }, function (err) {
            ErrorsService.addError(err);
          });
        },
        disableCreateInvite: function () {
          return vm.spinner === 'spinner started';
        }
      });

      function setAgent(agent) {
        Agent.loadRelations(agent).then(function () {
          vm.contacts = agent.contacts;
        });
      }

      if (SettingsService.getCurrentAgent()) {
        setAgent(SettingsService.getCurrentAgent());
      }

      $scope.$on('current-agent', function (e, agent) {
        setAgent(agent);
      });

    })
  ;

}());
