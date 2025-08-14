import React from "react";
import clsx from "clsx";
import PlusIcon from "@/assets/icon/Home/PlusIcon";

const AddButton = ({ onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "fixed bottom-[75px] size-15.5 rounded-full flex items-center justify-center shadow-toast cursor-pointer hover:opacity-90 transition",
        className
      )}
      style={{
        background: "linear-gradient(to bottom, #5A77FF 0%, #BFA1FA 100%)",
        paddingBottom: "env(safe-area-inset-bottom)",
        right: "calc(50vw - 187.5px + 16px)",
      }}
    >
      <PlusIcon />
    </button>
  );
};

export default AddButton;
