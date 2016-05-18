'use strict';

import GoogleFriend from './googleFriend.model';
import GoogleProfile from './googleProfile.model';
import socialFriendAbstractModel from '../../socialAbstractModel/socialAbstract.model.js';
import abstractCtrl from '../../../abstract/abstract.controller';

let GoogleModel = socialFriendAbstractModel('google', GoogleFriend, GoogleProfile);
let ctrl = abstractCtrl(GoogleModel);

export default ctrl;
