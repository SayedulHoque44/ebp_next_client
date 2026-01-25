import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Button from "@/components/ui/Button";

const EBSearch = ({
  placeholder = "Search...",
  onSearch,
  allowClear = true,
  className = "",
  defaultValue = "",
}: {
  placeholder?: string;
  onSearch?: (value: string) => void;
  allowClear?: boolean;
  className?: string;
  defaultValue?: string;
}) => {
  const [value, setValue] = useState(defaultValue);

  // Update value when defaultValue changes
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setValue("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className={`relative flex items-center w-full max-w-md ${className}`}>
      <div className="relative grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-l-xl leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-P-primary/50 focus:border-P-primary sm:text-sm transition duration-150 ease-in-out shadow-sm"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {allowClear && value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none"
          >
            <IoClose size={18} />
          </button>
        )}
      </div>
      <Button
        onClick={handleSearch}
        variant="primary"
        className="rounded-l-none rounded-r-xl h-[46px]! px-6 shadow-none"
      >
        Search
      </Button>
    </div>
  );
};

export default EBSearch;
