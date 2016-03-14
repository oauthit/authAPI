'use strict';
import request from 'supertest';
import app from '../../../../app';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import ProviderToken from '../../../providerToken/providerToken.model';
import FB from 'fb';
import FacebookFriend from './facebookFriend.model';
import FacebookProfile from './facebookProfile.model';
sinonStubPromise(sinon);

//TODO setup test token
const token = 'fb1d3fce-70a0-4b13-99a9-351b49b42607';

describe('facebook controller', function () {

  describe('/api/facebook/friend', function () {
    var ProviderTokenSpy, FbApiSpy, FacebookFriendSpy;
    beforeEach(function () {
      ProviderTokenSpy = sinon.spy(ProviderToken, 'findByProfileId');
      FbApiSpy = sinon.spy(FB, 'api');
      FacebookFriendSpy = sinon.spy(FacebookFriend, 'saveAll');
    });

    afterEach(function () {
      ProviderTokenSpy.restore();
      FbApiSpy.restore();
      FacebookFriendSpy.restore();
    });

    it('should get facebook friends list when GET /api/facebook/friend', function (done) {

      request(app)
        .get('/api/facebook/friend')
        .set('authorization', token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) done(err);
          res.body.should.be.instanceOf(Array);
          expect(ProviderTokenSpy.callCount).to.be.eq(1);
          expect(FbApiSpy.callCount).to.be.eq(1);
          expect(FacebookFriendSpy.callCount).to.be.eq(1, 'FacebookFriend.saveAll() should be called once');
          done();
        });

    });
  });

  describe('/api/facebook/friend/:id', function () {

    var ProviderTokenSpy, FacebookProfileStub;
    beforeEach(function () {
      ProviderTokenSpy = sinon.spy(ProviderToken, 'findByProfileId');
      FacebookProfileStub = sinon.stub(FacebookProfile, 'getFromRedis');
    });

    afterEach(function () {
      ProviderTokenSpy.restore();
      FacebookProfileStub.restore();
    });

    it('should get facebook friend by profile id when GET /api/facebook/friend/:id', function (done) {

      var promise = FacebookProfileStub.returnsPromise();
      promise.resolves('{"name": "Александр Лёвин","id": "941538315899640"}');

      request(app)
        .get('/api/facebook/friend/1')
        .set('authorization', token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) done(err);
          res.body.should.be.instanceOf(Object);
          expect(ProviderTokenSpy.callCount).to.be.eq(1, 'ProviderToken.findByProfileId(id) should be called once');
          expect(FacebookProfileStub.callCount).to.be.eq(1, 'FacebookProfile.get(id) should be called once');
          done();
        });

    });
  });

});
