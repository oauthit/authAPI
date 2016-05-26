create or replace trigger aa.SocialFriend_bIU
  before update, insert
  order 100 on aa.SocialFriend
  referencing new as inserted old as deleted
  for each row
begin

  set inserted.friendSocialAccountId = (
    select id from aa.SocialAccount
    where profileId = inserted.friendProfileId
  );

  set inserted.ownerSocialAccountId = (
    select id from aa.SocialAccount
    where profileId = inserted.ownerProfileId
  );

  if inserting then
    delete aa.SocialFriend
    where friendSocialAccountId = inserted.friendSocialAccountId
      and ownerSocialAccountId = inserted.ownerSocialAccountId
  end if;

end;
