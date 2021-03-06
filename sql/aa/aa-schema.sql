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
meta.defineType 'clientId:STRING';
meta.defineType 'clientSecret:CODE';
meta.defineType 'clientPublic:CODE,,nullable';
meta.defineType 'callbackUrl:STRING';
meta.defineType 'passReqToCallback:BOOL';
meta.defineType 'code:CODE';
meta.defineType 'tokenInfo:STRING';
meta.defineType 'url:STRING';
meta.defineType 'isPublic:BOOL';
meta.defineType 'loginPage:CODE,,nullable'
meta.defineType 'isOffline:BOOL';
meta.defineType 'scope:STRING';

meta.defineEntity 'Account',
  'name;roles;isDeleted;'
;

meta.defineEntity 'Org',
  'isDeleted;name;isPublic'
;

meta.defineEntity 'Role',
  'isDeleted;name;code;isPublic'
;

meta.defineEntity 'OrgRole',
  'isDeleted',
  'Org,orgId;Role,roleId'
;

meta.defineEntity 'ProviderApp',
  'isDeleted;name;clientId;clientSecret;clientPublic;provider;url,,,nullable;scope;isOffline'
;

meta.defineEntity 'OrgAccount',
  'isDeleted;name',
  'Org,orgId;Account,accountId'
;

meta.defineEntity 'OrgAccountRole',
  'isDeleted',
  'Org,orgId;Account,accountId;Role,roleId;OrgAccount,orgAccountId'
;

meta.defineEntity 'OrgProviderApp',
  'isDeleted',
  'Org,orgId;ProviderApp,providerAppId'
;

meta.defineEntity 'ProviderAccount',
  'profileId;profileData;name;roles;accessToken;refreshToken;isDeleted',
  'Account,accountId,nullable;SocialAccount,socialAccountId,nullable;ProviderApp,providerAppId'
;

meta.defineEntity 'OrgProviderAccount',
  'isDeleted',
  'Org,orgId;ProviderAccount,providerAccountId'
;

meta.defineEntity 'SocialAccount',
  'isDeleted;profileId;name;provider;avatarUrl'
;

meta.defineEntity 'SocialFriend',
  'isDeleted;ownerProfileId,profileId;friendProfileId,profileId',
  'SocialAccount,ownerSocialAccountId;SocialAccount,friendSocialAccountId'
;

meta.defineEntity 'Token',
  'tokenInfo;isDeleted',
  'Account,accountId;OrgApp,orgAppId,nullable;App,appId,nullable;Org,orgId,nullable'
;

meta.defineEntity 'App',
  'isDeleted;url;loginPage'
;

meta.defineEntity 'OrgApp',
  'isDeleted',
  'Org,orgId;App,appId'
;

meta.createTable 'Account',0,1;
meta.createTable 'Org',0,1;
meta.createTable 'Role',0,1;
meta.createTable 'App',0,1;
meta.createTable 'Token',0,1;

meta.createTable 'OrgRole',0,1;
meta.createTable 'OrgAccountRole',0,1;
meta.createTable 'OrgAccount',0,1;

meta.createTable 'ProviderApp',0,1;
meta.createTable 'ProviderAccount',0,1;

meta.createTable 'SocialAccount',0,1;
meta.createTable 'SocialFriend',0,1;

meta.createTable 'OrgProviderApp',0,1;
meta.createTable 'OrgProviderAccount',0,1;
meta.createTable 'OrgAccount',0,1;
meta.createTable 'OrgApp',0,1;

alter table aa.ProviderApp add code CODE not null compute (string(provider,name));
alter table aa.ProviderApp add unique (code);
alter table aa.ProviderApp add unique (provider, name);
alter table aa.App add unique (url);
alter table aa.OrgRole add unique (orgId, roleId);
alter table aa.SocialAccount add unique (profileId, name);
alter table aa.SocialFriend add unique (ownerProfileId, friendProfileId);
