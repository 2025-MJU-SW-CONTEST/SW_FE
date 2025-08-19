import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";

const BottomNavigationItem = ({ Icon, href, text, isAlsoActive }) => {
  const location = useLocation();
  const path = `/${href.replace(/^\/?/, "")}`;

  return (
    <NavLink to={path} end>
      {({ isActive }) => {
        const extraActive =
          typeof isAlsoActive === "function"
            ? isAlsoActive(location.pathname)
            : false;
        const active = isActive || extraActive;

        return (
          <div className="flex flex-col items-center cursor-pointer gap-005">
            <div className="h-[5px]">
              {active && (
                <div className="w-14 h-[5px] bg-gradient-to-r from-primary to-secondary-300 rounded-bl-003 rounded-br-003" />
              )}
            </div>
            <div>
              <div className="flex flex-col items-center justify-center w-16">
                <Icon isActive={active} />
              </div>
              <p
                className={clsx(
                  "pretendard_medium w-16 text-center",
                  active ? "text-primary" : ""
                )}
              >
                {text}
              </p>
            </div>
          </div>
        );
      }}
    </NavLink>
  );
};

export default BottomNavigationItem;
