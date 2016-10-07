'use strict';

import {Strategy as VkontakteStrategy} from 'passport-vkontakte';
import basePassportSetup from '../basePassportSetup';

export default basePassportSetup(VkontakteStrategy,{
  _apiVersion: null,
  userProfile: function(accessToken, done) {
    VkontakteStrategy.prototype.userProfile.call(this, accessToken,(err, profile)=>{
      if (err) {
        done(err);
      } else {
        profile.id = profile.id || profile._json.uid;
        done(null, profile);
      }
    });
  }
});
