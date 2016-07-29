"use strict";

import passportCb from './passportCallback';
import providerAccount from '../models/providerAccount/providerAccount.model';
const FACEBOOK_PROVIDER = 'facebook';
const SMS_PROVIDER = 'sms';
const GOOGLE_PROVIDER = 'google';
const ProviderAccount = providerAccount();


export default function (Strategy) {

  return function (app, config) {

    switch (app.provider) {
      case SMS_PROVIDER:
        config = config || {};
        return setupStrategy(config);
      case FACEBOOK_PROVIDER:
        return setupStrategy();
      case GOOGLE_PROVIDER:
        return setupStrategy();
      default:
        throw new Error(`No such provider "${app.provider}" configured...`);
    }


    function setupStrategy(config) {
      config = Object.assign({}, config, {
        clientID: app.clientId,
        clientSecret: app.clientSecret,
        callbackURL: `${process.env.DOMAIN || ''}/auth/${app.provider}/${app.name}/callback`,
        passReqToCallback: true
      });
      let strategy = new Strategy(config, (request, accessToken, refreshToken, profile, done) => {
        ProviderAccount.getOrCreate({
          profileId: profile.id
        }, {
          profileData: profile,
          profileId: profile.id,
          name: profile.displayName,
          roles: [],
          accessToken: accessToken,
          refreshToken: refreshToken,
          appId: app.id
        }).then(passportCb(app.provider, profile, done), done);
      });

      strategy.name = app.provider + app.name;
      return strategy;
    }
  };
}
