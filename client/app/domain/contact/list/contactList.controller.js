'use strict';

(function () {

  angular.module('authApiApp')
    .controller('ContactListCtrl', function (
      $scope,
      $state,
      $q,
      Agent,
      CounterAgent,
      Invite,
      InitCtrlService
    ) {

      var counterAgentPromise = CounterAgent.findAll();
      var vm = InitCtrlService.setup(this);


      angular.extend(vm,{

        buttons: [{
          name: 'Add a contact',
          sref: 'debt.contact.add'
        }]

      });

      vm.onSetAgent = function (agent) {
        vm.contacts = agent.contacts;
        var agentPromise = Agent.loadRelations(agent, 'contact', {bypassCache:true});

        vm.busy = $q.all([agentPromise, counterAgentPromise]);

        agentPromise.then(function(){
          vm.contacts = agent.contacts;
        });
      };

      InitCtrlService.init (vm,$scope);

    })
  ;

}());
