import React from "react";

const formatNewlines = (text) => {
  if (typeof text !== "string") return text;

  return text.split("\n").map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index < array.length - 1 && <br />}{" "}
      {/* 마지막 줄이 아니면 <br /> 추가 */}
    </React.Fragment>
  ));
};

export default formatNewlines;
