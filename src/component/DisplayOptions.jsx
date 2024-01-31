import React from "react";

const DisplayOptions = ({ displayOption, setDisplayOption }) => {
  const handleDisplayOptionChange = (option) => {
    setDisplayOption(option);
  };

  return (
    <div className="displayBy">
      Display By:
      <select
        value={displayOption}
        onChange={(e) => handleDisplayOptionChange(e.target.value)}
      >
        <option value="id">ID</option>
        <option value="title">Title</option>
        <option value="completed">checked</option>
      </select>
    </div>
  );
};

export default DisplayOptions;
