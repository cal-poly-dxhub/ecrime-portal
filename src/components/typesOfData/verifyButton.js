import React, { Component } from "react";
import styled from "styled-components";

// Verify Button CSS
const Container = styled.div`
  width: ${props => props.startRadius}px;
  height: ${props => props.startRadius}px;
  border-radius: 100%;
  margin: ${props => props.startMargin}px; 
  background-size: cover; 
  background-image: url("${props => props.image}");
  transition: width .25s, height .25s, margin .25s;
  
  &:hover {
    width: ${props => props.endRadius}px;
    height: ${props => props.endRadius}px;
    margin: ${props => props.endMargin}px; 
    background-image: url("${props => props.profile}");
    opacity: ${props => props.hover};
  }

`;

/**
 * Verify Button
 *
 * @param {string} checkmarkImg
 * @param {string} profileImg
 * @param {double} startRadius
 * @param {double} endRadius
 * @param {double} startMargin for centering purposes
 * @param {double} endMargin = startMargin + ((startMargin - startRadius)/2)  |  [https://jsfiddle.net/xcWge/18/]
 */
class VerifyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.checkmarkImg,
      hover: 0.5,
      startRadius: this.props.startRadius,
      endRadius: this.props.endRadius,
      startMargin: this.props.startMargin,
      endMargin: this.props.endMargin
    };
  }

  verify() {
    this.setState({
      image: this.props.profileImg,
      hover: 1.0,
      startRadius: this.props.endRadius,
      startMargin: this.props.endMargin
    });
  }

  render() {
    return (
      <Container
        image={this.state.image}
        profile={this.props.profileImg}
        hover={this.state.hover}
        startRadius={this.state.startRadius}
        endRadius={this.state.endRadius}
        startMargin={this.state.startMargin}
        endMargin={this.state.endMargin}
        onClick={() => this.verify()}
      />
    );
  }
}

export default VerifyButton;
