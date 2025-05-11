import React, { useState } from "react";

const Dropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value); // Pass the selected option to the parent or callback
  };

  return (
    <div className="dropdown">
      <label htmlFor="collegeDropdown" className="block text-sm font-medium text-black">
        Select Status
      </label>
      <select
        id="collegeDropdown"
        value={selectedOption}
        onChange={handleChange}
        className="mt-2 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
      >
        <option  value="" disabled>
         <span className="text-xs md:"> -- Select Task Status --</span>
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
