"use strict";

import store from './store';
import {findOrCreate} from './findOrCreate';

store.defineMapper('token');

const token = store.getMapper('token');
token.findOrCreate = findOrCreate

export default token;
