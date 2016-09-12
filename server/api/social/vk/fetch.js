'use strict';

import VKApi from 'node-vkapi';

export default function (providerApp, providerAccount) {

  console.log(providerAccount);
  return new Promise((resolve, reject) => {
    const VK = new VKApi({
      app: {
        id: providerApp.clientId,
        secret: providerApp.clientSecret
      }
    });

    VK.call('friends.get', {
      user_id: providerAccount.profileId,
      fields: [
        'nickname', 'domain', 'sex', 'bdate', 'city', 'country',
        'timezone', 'photo_50', 'photo_100', 'photo_200_orig',
        'has_mobile', 'contacts', 'education', 'online', 'relation',
        'last_seen', 'status', 'can_write_private_message',
        'can_see_all_posts', 'can_post', 'universities'
      ]
    }).then(vkFriends => {
      return resolve(vkFriends);
    }).catch(err => {
      return reject(err);
    });
  });

}
