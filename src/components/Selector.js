import React from "react";
import Downshift from "downshift";

function Selector(props) {
  return (
    <Downshift
      onChange={selection => props.onChange(selection)}
      itemToString={selectedResult =>
        selectedResult ? selectedResult.title : ""
      }
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
        <fieldset>
          <label {...getLabelProps()}>
            Select a vote by typing some text into the box below.
          </label>
          <input {...getInputProps()} />
          <ul>
            {isOpen
              ? props.votes
                  .filter(
                    ({ title }) => !inputValue || title.includes(inputValue)
                  )
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: `result-${index}`,
                        index,
                        item,
                        style: {
                          color:
                            highlightedIndex === index
                              ? "#fbfbfb" // off-white
                              : "#0b3536", // dark-grey
                          backgroundColor:
                            highlightedIndex === index
                              ? "#0098d8" // power-blue
                              : "#fbfbfb", // off-white
                          fontWeight:
                            selectedItem === item.id ? "bold" : "normal",
                          maxWidth: "570px", // line-it-up with the text above
                          padding: "5px 15px"
                        }
                      })}
                    >
                      {item.title}
                    </li>
                  ))
              : null}
          </ul>
        </fieldset>
      )}
    </Downshift>
  );
}

export default Selector;
