'use strict';
import request from 'supertest';
import app from '../../../../app';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import ProviderToken from '../../../../models/providerToken.model.js';
import FB from 'fb';
import FacebookFriend from './facebookFriend.model';
import FacebookProfile from './facebookProfile.model';
sinonStubPromise(sinon);

//TODO setup test token
const token = 'b5d198d5-e0b1-4002-a1d4-5f62aaf457ff';

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

  describe('FB.api not returns anything', function () {

    var FbApiStub, FacebookFriendStub;
    beforeEach(function () {
      FbApiStub = sinon.stub(FB, 'api');
      FbApiStub.onFirstCall().callsArgWith(2, null);
      FacebookFriendStub = sinon.stub(FacebookFriend, 'getAll')
    });

    afterEach(function () {
      FbApiStub.restore();
      FacebookFriendStub.restore();
    });

    it('should get facebook friends list when FB.api not returns anything', function (done) {
      FacebookFriendStub.restore();
      FacebookFriendStub = sinon.spy(FacebookFriend, 'getAll');

      request(app)
        .get('/api/facebook/friend')
        .set('authorization', token)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(FbApiStub.callCount).to.be.eq(1);
          expect(FacebookFriendStub.callCount).to.be.eq(1);
          res.body.should.be.instanceOf(Array);
          done();
        });

    });

    it('should return 404 when FB.api not returns anything and redis empty', function (done) {

      var promise = FacebookFriendStub.returnsPromise();
      promise.resolves(null);

      request(app)
        .get('/api/facebook/friend')
        .set('authorization', token)
        .expect(404)
        .end((err) => {
          if (err) done(err);
          expect(FbApiStub.callCount).to.be.eq(1);
          expect(FacebookFriendStub.callCount).to.be.eq(1);
          done();
        });
    });

    it('should call FacebookProfile.getFromRedis when FacebookFriend.getAll returns', function (done) {

      var friends = ['1234'];

      var FacebookProfileStub;
      FacebookProfileStub = sinon.stub(FacebookProfile(), 'getFromRedis');
      console.log(FacebookProfileStub);
      var profilePromise = FacebookProfileStub.returnsPromise();
      profilePromise.resolves({id:1, name: "some name"});
      var friendsPromise = FacebookFriendStub.returnsPromise();
      friendsPromise.resolves(friends);

      request(app)
        .get('/api/facebook/friend')
        .set('authorization', token)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(FbApiStub.callCount).to.be.eq(1);
          expect(FacebookFriendStub.callCount).to.be.eq(1);
          expect(FacebookProfileStub.callCount).to.be.eq(1, 'FacebookProfileStub');
          FacebookProfileStub.restore();
          res.body.length.should.be.eq(1);

          done();
        });

    });

  });

  describe('/api/facebook/friend/:id', function () {

    var ProviderTokenSpy, FacebookProfileStub;
    beforeEach(function () {
      ProviderTokenSpy = sinon.spy(ProviderToken, 'findByProfileId');
      FacebookProfileStub = sinon.stub(FacebookProfile(), 'getFromRedis');
    });

    afterEach(function () {
      ProviderTokenSpy.restore();
      FacebookProfileStub.restore();
    });

    it('should get facebook friend by profile id when GET /api/facebook/friend/:id', function (done) {

      var promise = FacebookProfileStub.returnsPromise();
      promise.resolves({"name": "Александр Лёвин","id": "941538315899640"});

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
