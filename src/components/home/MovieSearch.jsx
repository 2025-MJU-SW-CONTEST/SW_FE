import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "@/assets/icon/Home/SearchIcon";
import SearchBarIcon from "@/assets/icon/Home/SearchBarIcon";
import SearchClearIcon from "@/assets/icon/Home/SearchClearIcon";

const MovieSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const prevSearchTermRef = useRef(searchTerm);
  const { t } = useTranslation(["placeholder"]);

  useEffect(() => {
    if (searchTerm === "" && prevSearchTermRef.current !== "") {
      onSearch("");
    }
    prevSearchTermRef.current = searchTerm;
  }, [searchTerm, onSearch]);

  // 검색 실행 핸들러 (버튼 클릭 or Enter key)
  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      // ESC로 초기화 가능
      setSearchTerm("");
      onSearch("");
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center w-[359px] h-[43px] mt-[19px] pl-[23px] pr-[11.5px] bg-secondary-50 rounded-010 shadow-lg">
      <input
        ref={inputRef}
        type="text"
        placeholder={t("placeholder:placeholder_search")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-grow pr-2 bg-transparent text-font-500 placeholder-font-500 pretendard_regular focus:outline-none"
      />
      <SearchBarIcon />
      {searchTerm ? (
        <button
          type="button"
          onClick={handleClear}
          className="ml-[10.5px] focus:outline-none"
        >
          <SearchClearIcon />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSearch}
          className="ml-[10.5px] focus:outline-none"
        >
          <SearchIcon />
        </button>
      )}
    </div>
  );
};

export default MovieSearch;
