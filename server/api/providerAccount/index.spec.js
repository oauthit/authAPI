'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var providerAccountCtrlStub = {
  index: 'providerAccountCtrl.index',
  show: 'providerAccountCtrl.show',
  create: 'providerAccountCtrl.create',
  update: 'providerAccountCtrl.update',
  destroy: 'providerAccountCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var providerAccountIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './providerAccount.controller': providerAccountCtrlStub
});

describe('ProviderAccount API Router:', function() {

  it('should return an express router instance', function() {
    expect(providerAccountIndex).to.equal(routerStub);
  });

  describe('GET /api/providerAccount', function() {

    it('should route to providerAccount.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'providerAccountCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/providerAccount/:id', function() {

    it('should route to providerAccount.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'providerAccountCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/providerAccount', function() {

    it('should route to providerAccount.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'providerAccountCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/providerAccount/:id', function() {

    it('should route to providerAccount.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'providerAccountCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/providerAccount/:id', function() {

    it('should route to providerAccount.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'providerAccountCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/providerAccount/:id', function() {

    it('should route to providerAccount.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'providerAccountCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
