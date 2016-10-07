'use strict';

import googleapis from 'googleapis';

export default function (providerApp, providerAccount) {

  return new Promise((resolve, reject) => {
    let googleOAuth2Client = new googleapis.auth.OAuth2(providerApp.clientId, providerApp.clientSecret);
    googleOAuth2Client.setCredentials({
      access_token: providerAccount.accessToken,
      refresh_token: providerAccount.refreshToken
    });

    googleOAuth2Client.refreshAccessToken(err => {
      if (err) return reject(err);

      googleapis.plus('v1').people.list({
        userId: 'me',
        collection: 'visible',
        auth: googleOAuth2Client
      }, (err, reply) => {
        if (err) {
          return reject(err);
        }

        return resolve(reply);
      });

    });
  });
}
