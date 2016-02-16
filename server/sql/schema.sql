grant connect to aa;
grant dba to aa;

meta.defineType 'aa.provider:CODE';
meta.defineType 'aa.profileId:STRING';
meta.defineType 'aa.name';
meta.defineType 'aa.profileData';
meta.defineType 'aa.roles';

meta.defineEntity 'aa.Account', 'provider;profileId;profileData;name;roles';

meta.createTable 'aa.Account',0,1;

meta.defineType 'opr.name:STRING';
meta.defineType 'opr.total:PRICE';
meta.defineType 'opr.isDeleted:BOOL';
meta.defineType 'opr.status:STRING,,nullable';
meta.defineType 'opr.acceptorName:STRING,,nullable';
meta.defineType 'opr.ownerName:STRING,,nullable';
meta.defineType 'opr.code:STRING';
meta.defineType 'opr.currencySing:STRING';
meta.defineType 'opr.isoCode:STRING';
meta.defineType 'opr.comment:STRING,,nullable';
meta.defineType 'opr.remindDuration:TS,,nullable';
meta.defineType 'opr.authId:CODE';

meta.defineEntity 'opr.Agent', 'authId;name;isDeleted';
meta.defineEntity 'opr.Currency', 'name;isoCode;currencySing;isDeleted';
meta.defineEntity 'opr.Account', 'authId;total;isDeleted', 'Currency,currencyId;Agent,agentId';
meta.defineEntity 'opr.Invite', 'code;status;isDeleted;ownerName;acceptorName', 'Agent,ownerId;Agent,acceptorId';
meta.defineEntity 'opr.Operation', 'total;comment;remindDuration;isDeleted', 'Agent,debtorId;Agent,lenderId;Currency,currencyId;Account,lenderAccountId;Account,debtorAccountId';
meta.defineEntity 'opr.Contact', 'isDeleted', 'Agent,ownerId;Agent,agentId;Invite,inviteId';

meta.createTable 'opr.Agent',0,1;
meta.createTable 'opr.Account',0,1;
meta.createTable 'opr.Contact',0,1;
meta.createTable 'opr.Currency',0,1;
meta.createTable 'opr.Invite',0,1;
meta.createTable 'opr.Operation',0,1;


select * from opr.Operation
select * from opr.Agent;

insert into opr.Agent (name, authId, isDeleted) values ('Albert', 'someId1', 0);
insert into opr.Agent (name, authId, isDeleted) values ('Sasha', 'someId2', 1);

insert into opr.Currency (name, isoCode, currencySign, isDeleted) values ('dollar', '123', '$', 0);

insert into opr.Operation (debtor,lessor,total, currency, isDeleted) values (1,2,10, 1, 0)
