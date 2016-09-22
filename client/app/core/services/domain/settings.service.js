'use strict';

export function SettingsService($timeout, schema, $rootScope, localStorageService) {
  'ngInject';
  var currentOrg;
  var Org = schema.model('Org');

  function setCurrentOrg(org) {
    if (!org) {
      localStorageService.remove('current-org-id');
      $rootScope.$broadcast('current-org', undefined);
      return;
    }
    localStorageService.set('current-org-id', org.id);
    $rootScope.$broadcast('current-org', currentOrg = org);
  }

  function getCurrentOrg() {
    return currentOrg;
  }

  function setCurrentOrgOnChange() {
    var orgs = Org.getAll();

    if (!currentOrg || !_.find(orgs, {id: currentOrg.id})) {
      var id = localStorageService.get('current-org-id');
      setCurrentOrg(id && Org.get(id) || _.head(orgs));
    }
  }

  Org.on('DS.afterInject', function () {
    $timeout(setCurrentOrgOnChange());
  });

  Org.on('DS.afterDestroy', function () {
    $timeout(setCurrentOrgOnChange);
  });

  return {
    setCurrentOrg: setCurrentOrg,
    getCurrentOrg: getCurrentOrg
  };
}
