'use strict';

import refreshToken from './../refreshToken';
import FacebookFriend from './facebookFriend.model';
import FacebookProfile from './facebookProfile.model';
import socialFriendAbstractModel from '../../socialAbstract.model';
import abstractCtrl from '../../../abstract/abstract.controller';

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
