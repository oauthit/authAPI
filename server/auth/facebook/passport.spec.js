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

describe.only('GET /auth/{providerApp.code}', () => {

  before((done) => {
    setTimeout(function() {
      done();
    }, 3000);
  });

  it('should authorize', (done) => {

    //arrange

    request(app)
      .get('/auth/debteeFacebook')
      .expect(200, done)
    ;


  });

  it('should authorize', (done) => {
    request(app)
      .get('/auth/vseramkiFacebook')
      .expect(200, done)
    ;
  })

});
