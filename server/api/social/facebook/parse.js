'use strict';

export default function (friendsListObj) {

  return friendsListObj.items.map(item => {
    //TODO parse for facebook
    return {
      profileId: item.id,
      name: `${item.first_name} ${item.last_name}`,
      avatartUrl: item.photo_200_orig
    };
  });

};
