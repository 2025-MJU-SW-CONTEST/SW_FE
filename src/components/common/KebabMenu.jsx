import { useState, useRef, useEffect } from "react";
import KebabMenuIcon from "@/assets/icon/KebabMenuIcon";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import clsx from "clsx";

const KebabMenu = ({ onEdit, onDelete, menuMargin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button onClick={toggleMenu}>
        <KebabMenuIcon />
      </button>
      {isOpen && (
        <div className={clsx("absolute right-[-24px] flex flex-col mt-[11px] w-50 h-32 py-2 rounded bg-primary-50 shadow-kebab-button", menuMargin)}>
          <EditButton
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          />
          <DeleteButton
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
