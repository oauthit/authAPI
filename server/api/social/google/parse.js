'use strict';

export default function (friendsListObj) {
  friendsListObj.items = friendsListObj.items.filter(item => item.objectType === 'person');
  return friendsListObj.items.map(item => {
    return {
      profileId: item.id,
      name: item.displayName,
      avatarUrl: item.image.url,
      provider: 'google'
    };
  });
}
