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
meta.defineType 'credentials:STRING';
meta.defineType 'email:STRING,,nullable';
meta.defineType 'password:STRING,,nullable';
meta.defineType 'salt:STRING,,nullable';

meta.defineEntity 'Account',
  'name;roles;isDeleted;email;password;salt;provider'
;

meta.defineEntity 'Provider',
  'name;credentials;appId'
;
meta.defineEntity 'Org',
  'isDeleted;name'
;
meta.defineEntity 'OrgProvider',
  'isDeleted',
  'Org,orgId;Provider,providerId'
;

meta.defineEntity 'ProviderAccount',
  'provider;profileId;profileData;name;roles;accessToken;refreshToken;appId;isDeleted;',
  'Account,accountId,nullable;SocialAccount,socialAccountId;Provider,providerId'
;

meta.defineEntity 'OrgProviderAccount',
  'isDeleted',
  'Org,orgId;ProviderAccount,providerAccountId'
;

meta.defineEntity 'SocialAccount',
  'isDeleted;provider;profileId;name;avatarUrl'
;

meta.defineEntity 'SocialFriend',
  'isDeleted;provider;ownerProfileId,profileId;friendProfileId,profileId;',
  'SocialAccount,ownerSocialAccountId;SocialAccount,friendSocialAccountId;'
;

meta.createTable 'SocialAccount',0,1;
meta.createTable 'SocialFriend',0,1;
meta.createTable 'Account',0,1;
meta.createTable 'Org',0,1;
meta.createTable 'Provider',0,1;
meta.createTable 'OrgProvider',0,1;
meta.createTable 'ProviderAccount',0,1;
meta.createTable 'OrgProviderAccount',0,1;
