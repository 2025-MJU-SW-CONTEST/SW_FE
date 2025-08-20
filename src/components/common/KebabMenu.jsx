import { useState, useRef, useEffect } from "react";
import KebabMenuIcon from "@/assets/icon/KebabMenuIcon";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import clsx from "clsx";

const KebabMenu = ({ onEdit, onDelete, menuMargin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const close = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) close();
    };
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button type="button" onClick={toggleMenu}>
        <KebabMenuIcon />
      </button>
      {isOpen && (
        <div
          className={clsx(
            "absolute right-[-24px] flex flex-col mt-[11px] w-50 h-32 py-2 rounded bg-primary-50 shadow-kebab-button",
            menuMargin
          )}
        >
          <EditButton
            onClick={() => {
              onEdit?.();
              close();
            }}
          />
          <DeleteButton
            onClick={() => {
              onDelete?.();
              close();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
