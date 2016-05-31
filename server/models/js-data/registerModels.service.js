import {registerModel} from './modelsSchema.service';
const debug = require('debug')('authAPI:registerModels.service');

registerModel('account');
debug('Account was defined');
registerModel('providerAccount');
debug('ProviderAccount was defined');
registerModel('socialAccount');
debug('SocialAccount was defined');
registerModel('token');
debug('Token was defined');
registerModel('org');
debug('Org was defined');
registerModel('orgProviderApp');
debug('OrgProviderApp was defined');
registerModel('providerApp');
debug('ProviderApp was defined');
