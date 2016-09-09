'use strict';

import FB from 'fb';

export default function (providerApp, accessToken) {

  return new Promise((resolve) => {

    FB.options({
      appId: providerApp.clientId,
      appSecret: providerApp.clientSecret
    });

    FB.api('me/friends', {access_token: accessToken, limit: 10}, (res) => {
      return resolve(res);
    });

  });

}
