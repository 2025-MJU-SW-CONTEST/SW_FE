import React, { useEffect } from "react";

const ToastMessage = ({ message, duration = 3000, onClose, className }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-20.5 left-1/2 transform -translate-x-1/2 flex items-center w-86 h-12 bg-primary-50 pretendard_regular py-3.5 rounded-sm z-50 select-none shadow-toast ${className}`}
    >
      <div className="w-[5px] h-12 bg-primary mr-[11px] rounded-l"></div>
      {message}
    </div>
  );
};

export default ToastMessage;
