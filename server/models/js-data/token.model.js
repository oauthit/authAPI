"use strict";

import store from './store';
import {findOrCreate} from './findOrCreate';

store.defineMapper('Token');

const token = store.getMapper('Token');
token.findOrCreate = findOrCreate;

export default token;
