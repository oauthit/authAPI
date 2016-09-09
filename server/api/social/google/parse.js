'use strict';

export default function (friendsListObj) {
  return friendsListObj.items.map(item => {
    return {
      profileId: item.id,
      name: item.displayName,
      avatarUrl: item.image.url
    };
  });
}
