import { debounce } from "lodash";
import { useState, useRef, useCallback, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const ExpandableSearch = ({ onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef();

  const handleSearchClick = () => {
    setIsExpanded(true);
  };

  const handleSearch = useCallback(
    debounce((search) => {
      onSearch(search);
    }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    handleSearch(search);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div
        className={`transition-all duration-300 ${
          isExpanded ? "w-64" : "w-2"
        } relative`}
        onClick={handleSearchClick}
      >
        <input
          type="text"
          ref={inputRef}
          className={`w-full h-10 pl-10  ${
            isExpanded ? "cursor-text caret-black" : "cursor-pointer"
          } rounded-full border select-none border-gray-300 focus:outline-none focus:ring focus:border-blue-300 text-black search`}
          value={searchTerm}
          onChange={(e) => handleChange(e)}
          placeholder={isExpanded ? "Search..." : ""}
        />
        <svg
          className="absolute left-2 top-1/2 cursor-pointer transform -translate-y-1/2 w-6 h-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m2.2-6.85a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          />
        </svg>
      </div>
    </div>
  );
};
export default ExpandableSearch;
