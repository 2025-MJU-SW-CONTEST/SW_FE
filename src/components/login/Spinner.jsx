import React from "react";

export default function Spinner({ message = "로딩 중..." }) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="h-16 w-16 rounded-full border-4 border-white/40 border-t-white animate-spin" />
      {message ? (
        <p className="mt-4 pretendard_regular text-font-500 text-base">
          {message}
        </p>
      ) : null}
    </div>
  );
}
