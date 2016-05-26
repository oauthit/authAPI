create or replace trigger aa.ProviderAccount_bI
  before insert
  order 100 on aa.ProviderAccount
  referencing new as inserted
  for each row
begin

  merge into aa.SocialAccount as t using with auto name (
    select
      inserted.profileId as profileId,
      inserted.name as name
  ) as m on t.profileId = m.profileId
  when not matched then insert;

  set inserted.socialAccountId = (
    select id from aa.SocialAccount
    where profileId = inserted.profileId
  );

  merge into aa.SocialFriend as t using with auto name (
    select
      inserted.socialAccountId as ownerSocialAccountId,
      inserted.socialAccountId as friendSocialAccountId,
      inserted.profileId as ownerProfileId,
      inserted.profileId as friendProfileId
  ) as m on t.ownerSocialAccountId = m.ownerSocialAccountId
    and t.friendSocialAccountId = m.friendSocialAccountId
  when not matched then insert;

end;
