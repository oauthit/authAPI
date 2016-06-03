'use strict';

import {setup} from './passport.js';
import ProviderAccount from '../../models/js-data/providerAccount.model';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import passportCb from '../passportCallback';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

describe('passport setup function', () => {

  it('should setup', () => {

    //arrange
    let ProviderAccountStub = sinon.stub(ProviderAccount);
    let FacebookStrategyStub = sinon.stub(FacebookStrategy);
    let passportCbStub = sinon.stub(passportCb);

    let providerAppConfig = {};

    //act
    setup(ProviderAccountStub, providerAppConfig);

    //expect

  });

});
