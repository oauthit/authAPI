'use strict';

describe('Controller: HomeController', function () {


  // load the controller's module
  beforeEach(module('authApiApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('js-data-mocks'));

  var scope;
  var HomeController;
  var state;
  var $httpBackend;
  var DS;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_DS_, _$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    DS = _DS_;
    $httpBackend.when('GET', '/api/token/myAccessToken').respond(200, {});
    $httpBackend.when('GET', '/api/account/me').respond(200, {});
    //todo find out why two requests for currency and agent
    DS.expectFindAll('currency').respond([]);
    DS.expectFindAll('agent').respond([]);
    DS.expectFindAll('currency').respond([]);
    DS.expectFindAll('agent').respond([]);

    scope = $rootScope.$new();
    state = $state;
    state.params = {
      'access-token': 'myAccessToken'
    };

    HomeController = $controller('HomeController', {
      $scope: scope
    });
  }));

  it('should have data', function () {
    state.expectTransitionTo('auth.main');
    $httpBackend.flush();
    DS.flush();

    expect(true).to.equal(true);
    expect(HomeController.data.length).to.equal(3);
    state.ensureAllTransitionsHappened();
  });
});
