import Schema from './modelsSchema.service';

var registerModel = Schema.registerModel;
const debug = require('debug')('authAPI:registerModels.service');

registerModel('account');
registerModel('orgAccount');
registerModel('providerAccount');
registerModel('socialAccount');
registerModel('token');
registerModel('org');
registerModel('orgProviderApp');
registerModel('providerApp');
registerModel('app');
registerModel('orgApp');
