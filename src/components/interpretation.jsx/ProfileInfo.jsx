import { useMemo, useState } from "react";
import { toImageUrl } from "@/utils/images";

const DEFAULT_AVATAR = "/img/basicProfile.png";

const ProfileInfo = ({ user }) => {
  const [broken, setBroken] = useState(false);
  const name = user?.nickname || "작성자";
  const rawPhoto = user?.profileUrl || "";
  const photo = useMemo(() => {
    const u = toImageUrl ? toImageUrl(rawPhoto) : rawPhoto;
    return u || DEFAULT_AVATAR;
  }, [rawPhoto]);

  return (
    <div className="flex items-center gap-[9px]">
      <img
        src={broken ? DEFAULT_AVATAR : photo}
        alt={`${name} 프로필`}
        className="size-[27px] rounded-full object-cover"
        onError={() => setBroken(true)}
        referrerPolicy="no-referrer"
      />
      <span className="pretendard_medium text-014 font-semibold text-zinc-900">
        {name}
      </span>
    </div>
  );
};

export default ProfileInfo;
