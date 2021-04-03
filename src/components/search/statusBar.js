import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-left: 15px;
  font-size: 13px;
  color: grey;
`;

/**
 * Status Bar
 *
 * @param {string} numResults
 * @param {string} searchTime (in milliseconds)
 */
export default class StatusBar extends React.Component {
  render() {
    return (
      <Container>
        Found {this.props.numResults} search warrants in {this.props.searchTime}
        ms
      </Container>
    );
  }
}
