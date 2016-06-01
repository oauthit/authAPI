"use strict";

import {setAuthorized} from '../auth.service';
import sinon from 'sinon';
import {expect} from 'chai';
import Account from '../../models/js-data/account.model';
import ProviderAccount from '../../models/js-data/providerAccount.model';
import SocialAccount from '../../models/js-data/socialAccount.model';
import Token from '../../models/js-data/token.model';
import ProviderApp from '../../models/js-data/providerApp.model';
import {createRequest, createResponse} from 'node-mocks-http';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

const debug = require('debug')('authAPI:auth.service.spec');

describe("Auth service tests", () => {

  let AccountStub,
    ProviderAccountStub,
    SocialAccountStub,
    TokenStub,
    ProviderAppStub;

  beforeEach(() => {
    AccountStub = sinon.stub(Account);
    ProviderAccountStub = sinon.stub(ProviderAccount);
    SocialAccountStub = sinon.stub(SocialAccount);
    TokenStub = sinon.stub(Token);
    ProviderAppStub = sinon.stub(ProviderApp);
  });

  afterEach(() => {
    AccountStub = null;
    ProviderAccountStub = null;
    SocialAccountStub = null;
    TokenStub = null;
    ProviderAppStub = null;

  });

  describe('setAuthorized() function', () => {

    it('should check auth service setAuthorized function', () => {

      //arrange
      let req = createRequest({
        method: 'GET'
      });

      req.user = {name: 'someFakeUser'};

      let res = createResponse();

      let PAppFindAllPromise = sinon.stub(ProviderAppStub, 'findAll').returnsPromise();
      SocialAccountStub.findOrCreate.restore();
      let SAccFindOrCreatePromise = sinon.stub(SocialAccountStub, 'findOrCreate').returnsPromise();
      let SAccFindPromise = sinon.stub(SocialAccountStub, 'find').returnsPromise();
      let PAccCreatePromise = sinon.stub(ProviderAccountStub, 'create').returnsPromise();
      AccountStub.findOrCreate.restore();
      let AccFindOrCreatePromise = sinon.stub(AccountStub, 'findOrCreate').returnsPromise();
      let TokenCreatePromise = sinon.stub(TokenStub, 'create').returnsPromise();

      PAppFindAllPromise.resolves([
        {
          code: 'someProviderCode'
        }
      ]);
      SAccFindOrCreatePromise.resolves({
        name: 'test name'
      });

      SAccFindPromise.resolves({
        id: 'some social account id',
        name: 'test name',
        providerAccount: []
      });

      PAccCreatePromise.resolves({
        name: 'test name'
      });

      AccFindOrCreatePromise.resolves({
        name: 'test name'
      });

      TokenCreatePromise.resolves({
        id: 'some id'
      });

      //act
      setAuthorized('someFakeProviderCode')(req, res);

      //assert
      expect(PAppFindAllPromise.calledOnce).to.be.truthy;
      expect(SAccFindOrCreatePromise.calledOnce).to.be.truthy;
      expect(SAccFindPromise.calledOnce).to.be.truthy;
      expect(PAccCreatePromise.calledOnce).to.be.truthy;
      expect(AccFindOrCreatePromise.calledOnce).to.be.truthy;
      expect(TokenCreatePromise.calledOnce).to.be.truthy;
      expect(res._isEndCalled()).to.be.truthy;

    });

  });

});
