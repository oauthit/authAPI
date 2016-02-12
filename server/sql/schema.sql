grant connect to aa;
grant dba to aa;

meta.defineType 'aa.provider:CODE';
meta.defineType 'aa.profileId:STRING';
meta.defineType 'aa.name';
meta.defineType 'aa.profileData';
meta.defineType 'aa.isAdmin;;BOOLEAN';

meta.defineEntity 'aa.ProviderAccount', 'provider;profileId;profileData;name;isAdmin';
meta.defineEntity 'aa.Account', 'name';

meta.createTable 'aa.Account',0,1;
meta.createTable 'aa.ProviderAccount',0,1;
