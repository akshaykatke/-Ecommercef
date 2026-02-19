import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const updateSearchKeyword = (keyword) => {
    setSearchKeyword(keyword);
  };

  const clearSearch = () => {
    setSearchKeyword("");
  };

  const value = {
    searchKeyword,
    updateSearchKeyword,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
