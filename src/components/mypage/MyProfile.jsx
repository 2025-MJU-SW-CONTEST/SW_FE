import React from "react";
import useAuth from "@/store/useAuth";

const MyProfile = ({ userInfo, className = "" }) => {
  //   const { userInfo } = useAuth(); // 나중에 실제 데이터 쓸 때 변경

  if (!userInfo || !userInfo.id) {
    return (
      <div
        className={`flex items-center justify-center p-3 text-gray-500 ${className}`}
      >
        프로필 정보를 불러오는 중...
      </div>
    );
  }

  const { nickname, email, profileUrl } = userInfo;

  return (
    <div className={`flex pb-5.5 border-b border-font-200 ${className}`}>
      {/* 프로필 이미지 */}
      <div className="size-13.5 rounded-full overflow-hidden mr-[19px] border border-amber-600">
        {" "}
        {/*사진 테두리 임시 설정*/}
        <img
          src={profileUrl}
          alt={`${nickname}님의 프로필 사진`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 닉네임 및 이메일 */}
      <div className="flex flex-col justify-center">
        <p className="pretendard_medium text-016 text-font-700 leading-6">
          {nickname}
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
