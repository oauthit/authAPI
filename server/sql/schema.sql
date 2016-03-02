grant connect to aa;
grant dba to aa;

meta.defineType 'aa.provider:CODE';
meta.defineType 'aa.profileId:STRING';
meta.defineType 'aa.name';
meta.defineType 'aa.profileData';
meta.defineType 'aa.roles';
meta.defineType 'aa.accessToken:STRING,,nullable';
meta.defineType 'aa.refreshToken:STRING,,nullable';
meta.defineType 'aa.appId';

meta.defineEntity 'aa.Account', 'provider;profileId;profileData;name;roles;accessToken;refreshToken;appId';

meta.createTable 'aa.Account',0,1;
