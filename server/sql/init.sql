insert into opr.agent with auto name
  select name, xid as authid
  from aa.account
;

alter table opr.contact modify inviteId null;

insert into opr.contact with auto name
select o.id as ownerId, a.id as agentId
  from opr.agent as o, opr.agent as a
  where ownerId <> agentId
;

insert into opr.currency (name, symbol, isocode)
  select 'USD','$',840
  union all select 'EUR', '€', 978
  union all select 'RUR', '\xE2\x82\xBD', 810;

commit
