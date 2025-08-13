import React from "react";

const InterpretationInput = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className="w-87 min-h-76 mt-6 p-4 resize-none border-b border-primary rounded-t-[28px] bg-secondary-50 focus:outline-none pretendard_regular leading-6"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default InterpretationInput;
