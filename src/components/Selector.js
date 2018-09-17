import React, { Component } from "react";
import Downshift from "downshift";

class Selector extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selection) {
    this.props.onChange(selection);
  }

  render() {
    return (
      <Downshift
        onChange={this.handleChange}
        itemToString={selectedResult => (selectedResult ? selectedResult.description.en : "")}
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
                ? this.props.results
                    .filter(
                      result =>
                        !inputValue ||
                        result.description.en.includes(inputValue)
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
                              selectedItem === item ? "bold" : "normal",
                            maxWidth: "570px", // line-it-up with the text above
                            padding: "5px 15px"
                          }
                        })}
                      >
                        {item.description.en}
                      </li>
                    ))
                : null}
            </ul>
          </fieldset>
        )}
      </Downshift>
    );
  }
}

export default Selector;
