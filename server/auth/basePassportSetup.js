"use strict";

import passportCb from './passportCallback';
import providerAccount from '../models/providerAccount/providerAccount.model';

export default function (Strategy, strategyConfig) {
  return function (app, config) {

    config = Object.assign({}, config, {
      clientID: app.clientId,
      clientSecret: app.clientSecret,
      callbackURL: `${process.env.DOMAIN || ''}/auth/${app.provider}/${app.name}/callback`,
      passReqToCallback: true
    });

    let strategy = new Strategy(config, (request, accessToken, refreshToken, profile, done) => {

      if (!profile || !profile.id) {
        return done(new Error(`auth/${app.provider}/${app.name} no profile.id`));
      }

      providerAccount(request).getOrCreate({
        profileId: profile.id
      }, {
        profileData: profile,
        profileId: profile.id,
        name: profile.displayName || profile.name,
        roles: [],
        accessToken: accessToken,
        refreshToken: refreshToken,
        providerAppId: app.id
      }).then(passportCb(app.provider, profile, done), done);
    });

    strategy.name = app.code;
    Object.assign(strategy,strategyConfig||{});

    return strategy;

  };
}
