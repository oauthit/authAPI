'use strict';
import socialFriend from '../../socialFriend.model';
import config from '../../../../config/environment';

export default socialFriend(config.redisTables.GOOGLE_FRIEND);
