import React from "react";
import styled from "styled-components";
import Chips from "./chips";
import DropDownSelect from "./dropDownSelect";

const ListTextBoxContainer = styled.div`
  position: relative;
`;

/**
 * chipTextBox
 *
 * @param {function} deleteFunc //function to delete chips
 * @param {function} addChip //function to add chips
 * @param {string} placeholder //placeholder in textbox
 * @param {array} chipList //list of chips the user selects
 * @param {array} recommendations //used to populate a list of suggestions
 * @param {string} filter //used to identify what key should autosuggest look for in the suggestions list
 * @param {bool} userInput //ability of user to add their own data
 */
const ChipTextbox = props => {
  return (
    <ListTextBoxContainer>
      <Chips
        closeFunc={chip => props.deleteFunc(chip)}
        list={props.chipsList}
      />
      <DropDownSelect
        types={props.recommendations}
        placeholder={props.placeholder}
        chips={props.chipsList}
        addChip={chip => props.addChip(chip)}
        filter={props.filter}
        userInput={props.userInput}
      />
    </ListTextBoxContainer>
  );
};

export default ChipTextbox;
