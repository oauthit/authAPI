'use strict';

import {setup} from './passport.js';
import ProviderAccount from '../../models/providerAccount/providerAccount.model';
import passportCb from '../passportCallback';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

describe.skip('passport setup function', () => {

  it('should setup', () => {

    //arrange
    //console.log(JSON.stringify(ProviderAccount()));
    //let PAccPromise = sinon.stub(ProviderAccount());
    //let passportCbStub = sinon.stub(passportCb);

    let providerAppConfig = {};

    //act
    setup(ProviderAccountStub, providerAppConfig);

    //assert
    expect(PAccPromise.calledOnce).to.be.truthy;

  });

});
