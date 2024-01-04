import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchContent,
  clearSearchResults,
  setSearchWord,
  fetchBookmarks,
} from "../../redux/contentSlices";
import { useDispatch, useSelector } from "react-redux";
const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const showInputBar = inputValue ? "w-full" : "";
  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setInputValue(value);
    dispatch(setSearchWord(value));
    if (value.length > 0) {
      console.log("value is greter then 0 in searchBar");
      dispatch(searchContent(value));
    }
  };
  // Below is the logout code
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(fetchBookmarks.fulfilled([])); // Dispatch action to clear bookmarks
    navigate("/login");
  };
  return (
    <>
      <div className="flex items-center">
        <div
          className={`relative flex items-center w-full rounded-lg focus-within:shadow-lg overflow-hidden my-5 ${showInputBar}`}
        >
          <div className="grid place-items-center h-full w-12 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-300 pr-2 bg-transparent custom-cursor-color"
            type="text"
            id="search"
            placeholder="Search for Movies or Tv Series.."
            value={inputValue}
            onChange={handleChange}
          />
          {inputValue && (
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-700 transition-all duration-300" />
          )}
        </div>
        <div className=" text-white">
          <button
            className="bg-transparent hover:bg-red-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      </div>
    </>
  );
};
export default Searchbar;
