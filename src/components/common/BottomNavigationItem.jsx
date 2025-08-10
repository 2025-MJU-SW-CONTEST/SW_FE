import clsx from "clsx";
import { NavLink } from "react-router-dom";

const BottomNavigationItem = ({ Icon, href, text }) => {
  return (
    <NavLink to={`/${href.replace(/^\/?/, "")}`} end>
      {({ isActive }) => (
        <div className="flex flex-col items-center cursor-pointer gap-005">
          <div className="h-[5px]">
            {isActive && (
              <div className="w-14 h-[5px] bg-gradient-to-r from-primary to-secondary-300 rounded-bl-003 rounded-br-003" />
            )}
          </div>
          <div>
            <div className="flex flex-col items-center justify-center w-16">
              <Icon isActive={isActive} />
            </div>
            <p
              className={clsx(
                "pretendard_medium w-16 text-center",
                isActive ? "text-primary" : ""
              )}
            >
              {text}
            </p>
          </div>
        </div>
      )}
    </NavLink>
  );
};

export default BottomNavigationItem;
