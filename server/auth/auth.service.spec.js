//'use strict';
//
//import httpMocks from 'node-mocks-http';
//import {setAuthorized} from './auth.service';
//import account from '../api/account/account.model';
//var Account = account();
//import providerAccount from '../api/providerAccount/providerAccount.model';
//var ProviderAccount = providerAccount();
//import Token from '../api/token/token.model';
//import sinon from 'sinon';
//import sinonStubPromise from 'sinon-stub-promise';
//sinonStubPromise(sinon);
//
//describe('Auth service', function () {
//
//  describe('setAuthorized(req, res)', function () {
//
//    var AccountStub, ProviderAccountStub, TokenStub, req, res;
//    beforeEach(function () {
//      req = httpMocks.createRequest({
//        query: {
//          state: 'someAccountId'
//        },
//        user: {
//          id: 1,
//          provider: 'test'
//        }
//      });
//      res = httpMocks.createResponse();
//      AccountStub = sinon.stub(Account, 'findById');
//      ProviderAccountStub = sinon.stub(ProviderAccount, 'save');
//      TokenStub = sinon.stub(Token, 'save');
//    });
//
//    afterEach(function () {
//      AccountStub.restore();
//      ProviderAccountStub.restore();
//      TokenStub.restore();
//    });
//
//    it('should find account, update provider account, and redirect with token', function (done) {
//      var AccountPromise = AccountStub.returnsPromise();
//      var ProviderAccountPromise = ProviderAccountStub.returnsPromise();
//      var TokenPromise = TokenStub.returnsPromise();
//
//      AccountPromise.resolves({id: 1, name: 'test test'});
//      ProviderAccountPromise.resolves();
//      TokenPromise.resolves('someRandomToken');
//
//      setAuthorized(req, res);
//      console.log(res);
//
//      done();
//    });
//
//  });
//
//});
