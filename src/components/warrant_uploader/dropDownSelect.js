import React from "react";
import Autosuggest from "react-autosuggest";
import "./autosuggest.css";

/**
 * dropDownSelect
 *
 * @param {list} types //list of recommendations
 * @param {string} placeholder
 * @param {list} chips //list of chips
 * @param {function} addChip //function to add chips
 * @param {string} filter //used to identify what key should autosuggest look for in the suggestions list
 * @param {bool} userInput //ability of user to add their own data
 */
class dropDownSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: [],
      data: {},
      hasSearched: false
    };
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  // --- AUTOSUGGEST HELPERS ---
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.props.types.filter(
          lang =>
            lang[this.props.filter].toLowerCase().slice(0, inputLength) ===
            inputValue
        );
  };

  // Use your imagination to render suggestions.
  renderSuggestion(suggestion, { query }) {
    var match = require("autosuggest-highlight/match");
    var parse = require("autosuggest-highlight/parse");

    const matches = match(suggestion[this.props.filter], query);
    const parts = parse(suggestion[this.props.filter], matches);

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

  // --- AUTOSUGGEST ---
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: method === "click" || method === "enter" ? "" : newValue
    });
    //Make the first suggestion what ever is written in the textbox
    if (this.props.userInput) {
      this.props.types[0][this.props.filter] = newValue;
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  //adds a chip to the list
  addChip(dataType) {
    if (!this.props.chips.includes(dataType)) {
      this.props.addChip(dataType);
    }
  }

  //perform this when an autosuggest is clicked
  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.addChip(suggestionValue);
    this.getSuggestionValue("");
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion[this.props.filter];

  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions.slice(0, 5)}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default dropDownSelect;
