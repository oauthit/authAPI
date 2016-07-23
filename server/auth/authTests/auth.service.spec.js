"use strict";

import {setAuthorized} from '../auth.service';
import sinon from 'sinon';
import {expect} from 'chai';
import Account from '../../models/js-data/account.model';
import ProviderAccount from '../../models/js-data/providerAccount.model';
import SocialAccount from '../../models/js-data/socialAccount.model';
import Token from '../../models/js-data/token.model';
import OrgAccount from '../../models/js-data/orgAccount.model';
import Org from '../../models/js-data/org.model';
import OrgApp from '../../models/js-data/orgApp.model';
import App from '../../models/js-data/app.model';
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
    ProviderAppStub,
    PAppFindAllPromise,
    SAccFindOrCreatePromise,
    SAccFindPromise,
    PAccCreatePromise,
    AccFindOrCreatePromise,
    TokenCreatePromise,
    OrgAccountStub,
    OrgStub,
    OrgAppStub,
    AppStub,
    OrgAccountFindAllPromise,
    OrgFindPromise;

  beforeEach(() => {
    AccountStub = sinon.stub(Account);
    ProviderAccountStub = sinon.stub(ProviderAccount);
    SocialAccountStub = sinon.stub(SocialAccount);
    TokenStub = sinon.stub(Token);
    ProviderAppStub = sinon.stub(ProviderApp);
    OrgAccountStub = sinon.stub(OrgAccount);
    OrgStub = sinon.stub(Org);
    OrgAppStub = sinon.stub(OrgApp);
    AppStub = sinon.stub(App);
  });

  afterEach(() => {
    AccFindOrCreatePromise && AccFindOrCreatePromise.restore();
    //AccountStub.restore();
    //ProviderAccountStub.restore();
    //SocialAccountStub.restore();
    //TokenStub.restore();
    //ProviderAppStub.restore();
    PAppFindAllPromise && PAppFindAllPromise.restore();
    SAccFindOrCreatePromise && SAccFindOrCreatePromise.restore();
    SAccFindPromise && SAccFindPromise.restore();
    PAccCreatePromise && PAccCreatePromise.restore();
    TokenCreatePromise && TokenCreatePromise.restore();
  });

  describe('setAuthorized() function', () => {

    it('should check auth service setAuthorized function', () => {

      //arrange
      let req = createRequest({
        method: 'GET'
      });

      req.user = {name: 'someFakeUser'};

      let res = createResponse();

      PAppFindAllPromise = sinon.stub(ProviderAppStub, 'findAll').returnsPromise();
      SocialAccountStub.findOrCreate.restore();
      SAccFindOrCreatePromise = sinon.stub(SocialAccountStub, 'findOrCreate').returnsPromise();
      SAccFindPromise = sinon.stub(SocialAccountStub, 'find').returnsPromise();
      PAccCreatePromise = sinon.stub(ProviderAccountStub, 'create').returnsPromise();
      AccountStub.findOrCreate.restore();
      AccFindOrCreatePromise = sinon.stub(AccountStub, 'findOrCreate').returnsPromise();
      TokenCreatePromise = sinon.stub(TokenStub, 'create').returnsPromise();

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
