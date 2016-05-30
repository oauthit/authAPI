"use strict";

import abstractJSDataController from './abstract.jsdata.controller';
import {model} from '../../models/js-data/modelsSchema.service';
import sinon from 'sinon';
const expect = require('chai').expect;
const store = require('../../models/js-data/store');
import {createRequest, createResponse} from 'node-mocks-http';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

const Account = store.defineMapper('Acccount');

describe("Abstract JSData controller spec", () => {

  let ctrl;
  beforeEach(() => {
    ctrl = abstractJSDataController(Account);
  });

  afterEach(() => {
    ctrl = null;
  });

  it('should check ctrl methods', () => {
    //arrange
    const ctrl = abstractJSDataController(Account);

    //assert
    expect(ctrl.find).to.not.be.undefined;
    expect(ctrl.findAll).to.not.be.undefined;
    expect(ctrl.create).to.not.be.undefined;
    expect(ctrl.destroy).to.not.be.undefined;
    expect(ctrl.update).to.not.be.undefined;
    expect(ctrl.find).to.be.a('function');
    expect(ctrl.findAll).to.be.a('function');
    expect(ctrl.create).to.be.a('function');
    expect(ctrl.destroy).to.be.a('function');
    expect(ctrl.update).to.be.a('function');
  });

  it('should check find method', () => {
    //arrange
    let find = ctrl.find;

    //creates stub for Account.find
    console.log(Account);
    const AccountStub = sinon.stub(Account, 'find').returnsPromise();

    const request = createRequest({
      method: 'GET',
      params: {
        id: 42
      }
    });

    const response = createResponse();

    //act
    find(request, response);

    //assert
    expect(AccountStub.calledOnce).to.be.truthy;

  });

  it('should check findAll method', () => {

    //arange
    let findAll = ctrl.findAll;

    const AccountStub = sinon.stub(Account, 'findAll').returnsPromise();

    const request = createRequest({
      method: 'GET'
    });

    const response = createResponse();

    //act
    findAll(request, response);

    //assert
    expect(AccountStub.calledOnce).to.be.truthy;


  });

  it('should check create method', () => {

    //arrange
    let create = ctrl.create;

    const AccountStub = sinon.stub(Account, 'create').returnsPromise();

    const request = createRequest();

    const response = createResponse();

    //act
    create(request, response);

    //assert
    expect(AccountStub.calledOnce).to.be.truthy;
  });

  it('should check update method', () => {

    //arrange
    let update = ctrl.update;

    //update method finds by id and then updates found record
    const AccountStub = sinon.stub(Account, 'find').returnsPromise();

    const request = createRequest({
      method: 'PUT',
      params: {
        id: 42
      }
    });

    const response = createResponse();
    //act
    update.apply(ctrl, [request, response]);

    //assert
    expect(AccountStub.calledOnce).to.be.truthy;
  });

  it('should check destroy method', () => {

    //arrange
    let destroy = ctrl.destroy;

    const AccountStub = sinon.stub(Account, 'find').returnsPromise();

    const request = createRequest({
      method: 'DELETE',
      params: {
        id: 42
      }
    });

    const response = createResponse();

    //act
    destroy.apply(ctrl, [request, response]);

    //assert
    expect(AccountStub.calledOnce).to.be.truthy;

  });


});
