grant connect to aa;
grant dba to aa;

util.setUserOption 'asamium.default.domain', 'aa';

meta.defineType 'provider:CODE';
meta.defineType 'profileId:STRING';
meta.defineType 'name';
meta.defineType 'profileData';
meta.defineType 'roles';
meta.defineType 'accessToken';
meta.defineType 'refreshToken:STRING,,nullable';
meta.defineType 'appId';
meta.defineType 'isDeleted:BOOL';
meta.defineType 'avatarUrl:STRING,,nullable';
meta.defineType 'clientId:CODE';
meta.defineType 'clientSecret:CODE';
meta.defineType 'callbackUrl:STRING';
meta.defineType 'passReqToCallback:BOOL';
meta.defineType 'code:CODE';
meta.defineType 'tokenInfo:STRING';

meta.defineEntity 'Account',
  'name;roles;isDeleted;'
;

meta.defineEntity 'Org',
  'isDeleted;name'
;

meta.defineEntity 'ProviderApp',
  'isDeleted;name;clientId;clientSecret;provider;code'
;

meta.defineEntity 'OrgProvider',
  'isDeleted',
  'Org,orgId;ProviderApp,providerAppId'
;

meta.defineEntity 'OrgProviderApp',
  'isDeleted',
  'Org,orgId;ProviderApp,providerAppId'
;

meta.defineEntity 'ProviderAccount',
  'profileId;profileData;name;roles;accessToken;refreshToken;isDeleted',
  'Account,accountId,nullable;SocialAccount,socialAccountId;'
;

meta.defineEntity 'OrgProviderAccount',
  'isDeleted',
  'Org,orgId;ProviderAccount,providerAccountId'
;

meta.defineEntity 'SocialAccount',
  'isDeleted;profileId;name;avatarUrl'
;

meta.defineEntity 'SocialFriend',
  'isDeleted;ownerProfileId,profileId;friendProfileId,profileId',
  'SocialAccount,ownerSocialAccountId;SocialAccount,friendSocialAccountId'
;

meta.defineEntity 'Token',
  'tokenInfo;isDeleted'
;

meta.createTable 'SocialAccount',0,1;
meta.createTable 'SocialFriend',0,1;
meta.createTable 'Account',0,1;
meta.createTable 'Org',0,1;
meta.createTable 'ProviderApp',0,1;
meta.createTable 'OrgProvider',0,1;
meta.createTable 'OrgProviderApp',0,1;
meta.createTable 'ProviderAccount',0,1;
meta.createTable 'OrgProviderAccount',0,1;
meta.createTable 'Token',0,1;
