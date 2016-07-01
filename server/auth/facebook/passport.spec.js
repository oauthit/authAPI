'use strict';

import {setup} from './passport.js';
import ProviderAccount from '../../models/providerAccount/providerAccount.model';
import passportCb from '../passportCallback';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import request from 'supertest';
import express from 'express';
sinonStubPromise(sinon);

import app from '../../index.js';

describe('passport setup function', () => {

  let PAccPromise;
  beforeEach((done) => {
    PAccPromise = sinon.stub(ProviderAccount());
    done();
  });

  afterEach((done) => {
    PAccPromise = null;
    done();
  });

  it('should setup', () => {
    //arrange

    //let passportCbStub = sinon.stub(passportCb);

    let providerAppConfig = {
      clientId: 'some id'
    };

    //act
    setup(PAccPromise, providerAppConfig);

    //assert
    expect(PAccPromise.calledOnce).to.be.truthy;

  });

});

describe('GET /auth/{providerApp.code}', () => {

  before((done) => {
    setTimeout(function () {
      done();
    }, 3000);
  });

  it('should authorize', (done) => {

    //arrange

    request(app)
      .get('/auth/debteeFacebook')
      .expect(302, done)
    ;


  });

  it('should authorize', (done) => {
    request(app)
      .get('/auth/vseramkiFacebook')
      .expect(302, done)
    ;
  })

});
