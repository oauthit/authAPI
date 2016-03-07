'use strict';

//// setup
//
//// load the controller's module
//// FIXME: modules cannot be loaded after inject, therefore root cannot have inject, or load all modules here
//beforeEach(module('authApiApp'));
//beforeEach(module('stateMock'));
//
//var $httpBackend;
//beforeEach(inject(function (_$httpBackend_) {
//  $httpBackend = _$httpBackend_;
//  $httpBackend.when('GET', '/api/account/me').respond(200, {});
//}));

//var getItem, setItem, clear;
//
//beforeEach(function () {
//
//  getItem = sinon.spy(localStorage, 'getItem');
//  setItem = sinon.spy(localStorage, 'setItem');
//  clear = sinon.spy(localStorage, 'clear');
//});
//
//afterEach(function () {
//  getItem.reset();
//  setItem.reset();
//  clear.reset();
//});
