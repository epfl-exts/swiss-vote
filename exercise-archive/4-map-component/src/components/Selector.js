import React from "react";

function Selector(props) {
  return (
    <select onChange={props.onChange} defaultValue={props.selection}>
      {/* empty option as default selected */}
      <option disabled selected></option>
      {props.results.map((result, i) => {
        return (
          <option value={i} key={i}>
            {result.description.en}
          </option>
        );
      })}
    </select>
  );
}

export default Selector;
