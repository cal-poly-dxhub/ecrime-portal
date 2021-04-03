import React from "react";
import { Auth } from "aws-amplify";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import styled from "styled-components";

import "./search.css";
import color from "../constants/colors";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import SearchWarrantsResults from "../containers/SearchWarrantResults";
import types_of_data from "../constants/typesOfData";
import StatusBar from "../components/search/statusBar";

// --- STYLING ---
// Input Bar CSS
const MainContainer = styled.div`
  margin-top: 20px;
  display: flex;
  direction: row;
  align-items: center;
`;

// Style for Search Input and Suggessions
// NOTE: uses React inline styles required by `react-autosuggest`
// const theme = {
//   container: {
//     display: "block",
//     width: 700,
//     height: "100%",
//     // backgroundColor: "grey",
//     borderRadius: 10,
//     paddingRight: 20
//   },
//   input: {
//     width: 690,
//     height: 40,
//     margin: 0,
//     padding: 5,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderStyle: "solid",
//     fontSize: 21,
//     fontFamily: "Helvetica",
//     borderColor: color.primary.gray
//   },
//   inputFocused: {
//     outline: "none",
//     boxShadow: `0 1px 7px rgba(0,0,0, .10)`
//   }
// };

// const theme = {
//   container: {
//     position: "relative"
//   },
//   input: {
//     width: 240,
//     height: 30,
//     padding: "10px 20px",
//     fontFamily: "Helvetica, sans-serif",
//     fontWeight: 300,
//     fontSize: 16,
//     border: "1px solid #aaa",
//     borderTopLeftRadius: 4,
//     borderTopRightRadius: 4,
//     borderBottomLeftRadius: 4,
//     borderBottomRightRadius: 4
//   },
//   inputFocused: {
//     outline: "none"
//   },
//   inputOpen: {
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0
//   },
//   suggestionsContainer: {
//     display: "none"
//   },
//   suggestionsContainerOpen: {
//     display: "block",
//     position: "absolute",
//     top: 51,
//     width: 280,
//     border: "1px solid #aaa",
//     backgroundColor: "#fff",
//     fontFamily: "Helvetica, sans-serif",
//     fontWeight: 300,
//     fontSize: 16,
//     borderBottomLeftRadius: 4,
//     borderBottomRightRadius: 4,
//     zIndex: 2
//   },
//   suggestionsList: {
//     margin: 0,
//     padding: 0,
//     listStyleType: "none"
//   },
//   suggestion: {
//     cursor: "pointer",
//     padding: "10px 20px"
//   },
//   suggestionHighlighted: {
//     backgroundColor: "#ddd"
//   }
// };

// Button CSS
const SearchIconContainer = styled.button`
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

// --- AUTOSUGGEST HELPERS ---
// Imagine you have a list of typesOfData that you'd like to autosuggest.
const typesOfData = types_of_data;

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : typesOfData.filter(
        lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
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

function buildCloudSearchQuery(value) {
  var base =
    "https://e6qt4vf7vi.execute-api.us-west-2.amazonaws.com/prod/search/";
  var query = "?q=" + value;
  return base + query;
}

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
      data: {},
      hasSearched: false
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

  // --- API calls ---
  // TODO: upload search warrants
  //
  // async uploadToS3() {
  //   Storage.put("test.txt", "yeeeeeeeeeeeeeee", {
  //     progressCallback(progress) {
  //       console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
  //     }
  //   })
  //     .then(result => console.log(result))
  //     .catch(err => console.log(err));
  // }

  async search() {
    var path = buildCloudSearchQuery(this.state.value);
    var user = await Auth.currentAuthenticatedUser();
    var token = user.signInUserSession.idToken.jwtToken;
    var currentComponent = this;

    axios
      .get(path, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
      .then(function(response) {
        // handle success
        currentComponent.setState({
          data: response.data,
          hasSearched: true
        });
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  handleSubmit = event => {
    console.log("A query was submitted: " + this.state.value);
    this.search();
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
      <div>
        {/* Search Bar */}
        <MainContainer>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            // theme={theme}
          />
          <SearchIconContainer
            onClick={this.handleSubmit}
            primary={color.primary.lightBlue}
          >
            <SearchIcon style={svgIcon} />
          </SearchIconContainer>
          {/* <button onClick={this.uploadToS3}> upload! </button> */}
        </MainContainer>

        {/* Results */}
        {this.state.hasSearched ? (
          <div>
            <StatusBar
              numResults={this.state.data.hits.found}
              searchTime={this.state.data.status.timems}
            />
            <SearchWarrantsResults hits={this.state.data.hits.hit} />
          </div>
        ) : null}
      </div>
    );
  }
}
