import React, { useState } from "react";

interface YearFilterProps {
  onYearChange: (year: string) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({ onYearChange }) => {
  const [year, setYear] = useState("");

  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      // Only allow valid year input
      setYear(value);
      onYearChange(value);
    }
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <label htmlFor="year" className="mr-2 text-gray-700 font-medium">
        Filter by Year:
      </label>
      <input
        type="text"
        id="year"
        placeholder="e.g., 2021"
        value={year}
        onChange={handleYearInputChange}
        className="border rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-indigo-300"
      />
    </div>
  );
};

export default YearFilter;
