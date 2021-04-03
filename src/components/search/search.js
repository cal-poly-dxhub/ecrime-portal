import React from "react";
import Autosuggest from "react-autosuggest";
import color from "../../constants/colors";
import types_of_data from "../../constants/typesOfData";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import "./search.css";
import styled from "styled-components";

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: []
    };
  }

  // --- AUTOSUGGEST ---
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type the subject of search, type of data or crime",
      value,
      onChange: this.onChange
    };

    return (
      <MainContainer>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={theme}
        />
        <SearchIconContainer
          onClick={() => this.props.handleSubmit(value)}
          primary={color.primary.lightBlue}
        >
          <SearchIcon style={svgIcon} />
        </SearchIconContainer>
      </MainContainer>
    );
  }
}

// --- AUTOSUGGEST HELPERS ---
const typesOfData = types_of_data;

// used to calculate suggestions for any given input value
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : typesOfData.filter(
        lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// used to calculate the input value after a suggestion is clicked
const getSuggestionValue = suggestion => suggestion.name;

function renderSuggestion(suggestion, { query }) {
  var match = require("autosuggest-highlight/match");
  var parse = require("autosuggest-highlight/parse");

  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <span>
      {parts.map((part, index) => {
        const className = part.highlight
          ? "react-autosuggest__suggestion-match"
          : null;

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        );
      })}
    </span>
  );
}

// --- STYLING ---
const MainContainer = styled.div`
  margin-top: 20px;
  display: flex;
  direction: row;
  align-items: center;
`;

const theme = {
  container: {
    position: "relative"
  },
  input: {
    width: 450,
    height: 50,
    padding: "10px 20px",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    border: "1px solid #aaa",
    borderRadius: 10,
    marginRight: 10
  },
  inputFocused: {
    outline: "none",
    boxShadow: "0 3px 7px rgba(0, 0, 0, 0.2)"
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: "none"
  },
  suggestionsContainerOpen: {
    display: "block",
    position: "absolute",
    width: 450,
    borderBottom: "1px solid #aaa",
    borderLeft: "1px solid #aaa",
    borderRight: "1px solid #aaa",
    backgroundColor: "#fff",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 2,
    boxShadow: "0 3px 7px rgba(0, 0, 0, 0.2)"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  suggestion: {
    cursor: "pointer",
    padding: "10px 20px"
  },

  suggestionHighlighted: {
    backgroundColor: "rgb(224, 236, 255, 0.3)"
  },
  suggestionMatch: {
    color: "#59b7b1",
    fontWeight: "bold"
  }
};

// Button CSS
const SearchIconContainer = styled.button`
  position: relative;
  width: 50px;
  height: 50px;
  background: #e0ecff;
  border: none;
  border-radius: 10px;
  outline: none;

  &:hover {
    background: #d6ecff;
    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
  }
  &:focus {
    outline: none;
  }
`;

const svgIcon = {
  width: 20
};
