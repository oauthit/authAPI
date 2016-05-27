'use strict';

import refreshToken from './../refreshToken.service';
import FacebookFriend from './facebookFriend.model';
import FacebookProfile from './facebookProfile.model';
import socialFriendAbstractModel from '../../socialAbstractModel/socialAbstract.model.js';
import abstractCtrl from '../../../abstract/abstract.stapi.controller';

let FacebookModel = socialFriendAbstractModel('facebook', FacebookFriend, FacebookProfile);
let ctrl = abstractCtrl(FacebookModel);

Object.assign(ctrl, {

  refreshToken: (req, response) => {

    refreshToken(req.user.provider, req.user.profileId).then(function () {
      response.end();
    }, function () {
      response.end();
    });

  }

});

export default ctrl;
