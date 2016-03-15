create or replace trigger aa.ProviderAccount_bI
  before insert
  order 100 on aa.ProviderAccount
  referencing new as inserted
  for each row
begin

  if (inserted.accountId is null ) then

    insert into aa.Account with auto name select
      inserted.name as name
    ;

    set inserted.accountId = @@identity;

  end if;

end;
