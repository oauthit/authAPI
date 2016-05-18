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

meta.defineEntity 'Account', 'name;roles;isDeleted;';

meta.defineEntity 'Provider', '';
meta.defineEntity 'Org', '';
meta.defineEnitty 'OrgProvider', '';
meta.defineEntity 'OrgProviderAccount', '';

meta.defineEntity 'SocialAccount',
  'isDeleted;provider;profileId;name;avatarUrl'
;

meta.defineEntity 'SocialFriend',
  'isDeleted;provider;ownerProfileId,profileId;friendProfileId,profileId;',
  'SocialAccount,ownerSocialAccountId;SocialAccount,friendSocialAccountId;'
;

meta.defineEntity 'ProviderAccount',
  'provider;profileId;profileData;name;roles;accessToken;refreshToken;appId;isDeleted;',
  'Account,accountId,nullable;SocialAccount,socialAccountId'
;

meta.createTable 'SocialAccount',0,1;
meta.createTable 'SocialFriend',0,1;
meta.createTable 'Account',0,1;
meta.createTable 'ProviderAccount',0,1;
