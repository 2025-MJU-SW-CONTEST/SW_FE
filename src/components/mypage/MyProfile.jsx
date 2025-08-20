import React, { useState } from "react";

const DEFAULT_AVATAR = "/img/basicProfile.png";

const MyProfile = ({ userInfo, isLoading = false, className = "" }) => {
  if (isLoading) {
    return (
      <div
        className={`flex items-center gap-4 pb-5.5 border-b border-font-200 ${className}`}
      >
        <div className="size-13.5 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex flex-col gap-2 w-40">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!userInfo || !userInfo.id) {
    return (
      <div
        className={`flex items-center justify-center p-3 text-gray-500 ${className}`}
      >
        프로필 정보가 없습니다.
      </div>
    );
  }

  const { nickname, email, profileUrl } = userInfo;
  const [broken, setBroken] = useState(false);
  const photo = !broken && profileUrl ? profileUrl : DEFAULT_AVATAR;

  return (
    <div className={`flex pb-5.5 border-b border-font-200 ${className}`}>
      {/* 프로필 이미지 */}
      <div className="size-13.5 rounded-full overflow-hidden mr-[19px]">
        <img
          src={photo}
          alt={`${nickname}님의 프로필 사진`}
          className="w-full h-full object-cover"
          onError={() => setBroken(true)}
        />
      </div>

      {/* 닉네임 및 이메일 */}
      <div className="flex flex-col justify-center">
        <p className="pretendard_medium text-016 text-font-700 leading-6">
          {nickname ?? "닉네임 미설정"}
        </p>
        {email && (
          <p className="pretendard_regular text-014 text-font-600 leading-6">
            {email}
          </p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
