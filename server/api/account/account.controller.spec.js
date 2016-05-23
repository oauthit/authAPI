"use strict";

const expect = require('chai').expect;
const app = require('../../index.js');
const fetch = require('node-fetch');
const conf = require('../../config/environment');

describe("Account controller", function () {

  //todo get from config
  const serverPort = conf.port;
  let server;

  before(done => {
    server = app.listen(serverPort, done);
  });

  after(done => {
    server.close(done);
  });

  const index = () =>
    fetch(`http://localhost:${serverPort}/api/account`)
      .then((response) => response.ok ?
        response.json() :
        Promise.reject(new Error('cannot list accounts')));

  it.only('lists accounts', () => {
    index()
      .then(accounts => expect(accounts).to.equal([]))
  });

});

