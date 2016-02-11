'use strict';

var app = require('../..');
import request from 'supertest';

var newProviderAccount;

describe('ProviderAccount API:', function() {

  describe('GET /api/providerAccount', function() {
    var providerAccounts;

    beforeEach(function(done) {
      request(app)
        .get('/api/providerAccount')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          providerAccounts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(providerAccounts).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/providerAccount', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/providerAccount')
        .send({
          name: 'New ProviderAccount',
          info: 'This is the brand new providerAccount!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newProviderAccount = res.body;
          done();
        });
    });

    it('should respond with the newly created providerAccount', function() {
      expect(newProviderAccount.name).to.equal('New ProviderAccount');
      expect(newProviderAccount.info).to.equal('This is the brand new providerAccount!!!');
    });

  });

  describe('GET /api/providerAccount/:id', function() {
    var providerAccount;

    beforeEach(function(done) {
      request(app)
        .get('/api/providerAccount/' + newProviderAccount._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          providerAccount = res.body;
          done();
        });
    });

    afterEach(function() {
      providerAccount = {};
    });

    it('should respond with the requested providerAccount', function() {
      expect(providerAccount.name).to.equal('New ProviderAccount');
      expect(providerAccount.info).to.equal('This is the brand new providerAccount!!!');
    });

  });

  describe('PUT /api/providerAccount/:id', function() {
    var updatedProviderAccount;

    beforeEach(function(done) {
      request(app)
        .put('/api/providerAccount/' + newProviderAccount._id)
        .send({
          name: 'Updated ProviderAccount',
          info: 'This is the updated providerAccount!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProviderAccount = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProviderAccount = {};
    });

    it('should respond with the updated providerAccount', function() {
      expect(updatedProviderAccount.name).to.equal('Updated ProviderAccount');
      expect(updatedProviderAccount.info).to.equal('This is the updated providerAccount!!!');
    });

  });

  describe('DELETE /api/providerAccount/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/providerAccount/' + newProviderAccount._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when providerAccount does not exist', function(done) {
      request(app)
        .delete('/api/providerAccount/' + newProviderAccount._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
