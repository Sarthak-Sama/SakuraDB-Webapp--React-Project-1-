import React from "react";

function Dropdown({ title, options, selectedOption, func }) {
  return (
    <div className="select relative z-[10]">
      <select onChange={func} value={selectedOption} name="format" id="format">
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
