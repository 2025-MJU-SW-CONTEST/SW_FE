const ProfileInfo = ({ user }) => {
  return (
    <div className="flex items-center gap-[9px]">
      <img
        src={user.profileUrl}
        alt={`${user.nickname} 프로필`}
        className="size-[27px] rounded-full"
      />
      <span className="pretendard_medium text-014 font-semibold text-zinc-900">
        {user.nickname}
      </span>
    </div>
  );
};

export default ProfileInfo;
