import React from "react";
import clsx from "clsx";

const PageIndicator = ({ totalPages, currentPage }) => {
  return (
    <div className="flex space-x-3">
      {[...Array(totalPages)].map((_, idx) => {
        const page = idx + 1;
        const isActive = page === currentPage;

        return (
          <div
            key={page}
            className={clsx("transition-all duration-500 ease-in-out", {
              "w-6 h-3 bg-primary rounded-[24px]": isActive,
              "w-3 h-3 bg-font-200 rounded-full": !isActive,
            })}
          />
        );
      })}
    </div>
  );
};

export default PageIndicator;
