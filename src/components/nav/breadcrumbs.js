import React from "react";
import styled from "styled-components";

const BreadCrumbContainer = styled.div`
  tab-size: 4;
  font-family: "Helvetica", sans-serif;
  font-size: 24px;
  letter-spacing: 0px;
  line-height: 1.2;
  color: #bbbbbb;
`;
const BreadCrumb = styled.div`
  display: inline-block;
  margin-left: 8px;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    border-bottom: 2px solid black;
  }
`;
const IconContainer = styled.div`
  display: inline-block;
  //   background-color: #22ccdd;
  background: ${props => props.iconColor};
  width: 29px;
  height: 29px;
  border-radius: 50%;
  vertical-align: middle;
  position: relative;
  top: -3px;
  bottom: 0px;
`;
const Icon = styled.img`
  position: relative;
  left: 9px;
  bottom: 3px;
`;
const Slash = styled.div`
  display: inline-block;
  margin: 5px 13px;
  color: #bbbbbb;
`;
const Current = styled.span`
  color: black;
`;

/**
 * Bread Crumb
 *
 * @param {object} data
 */
class BreadCrumbs extends React.Component {
  setUpHome() {
    return <BreadCrumb>{"Home"}</BreadCrumb>;
  }
  setUpCategory() {
    let relevancyScore = this.props.data["company"]["relevancyScore"];
    let iconColor;

    //Changes color of icon based on the relevancy score of the company
    if (relevancyScore > 79) {
      iconColor = "#59B7B1";
    } else if (relevancyScore > 50) {
      iconColor = "#186B87";
    } else {
      iconColor = "#1D477F";
    }

    return (
      <div style={{ display: "inline-block" }}>
        <IconContainer iconColor={iconColor}>
          <Icon
            width="11px"
            height="11px"
            style={{ margin: "auto" }}
            src={this.props.data["dataType"]["icon"]}
            alt="not found"
          />
        </IconContainer>
        <BreadCrumb href={this.props.data["dataType"]["link"]}>
          {this.props.data["dataType"]["name"]}
        </BreadCrumb>
      </div>
    );
  }
  setUpCompany() {
    return <BreadCrumb>{this.props.data["company"]["name"]}</BreadCrumb>;
  }

  render() {
    //populate the bread crumbs from the object recieved as a prop
    let crumpList = [];
    for (let length = 0; length < this.props.data["numLayers"]; length++) {
      if (length === 0) {
        crumpList.push(this.setUpHome());
      } else if (length === 1) {
        crumpList.push(this.setUpCategory());
      } else if (length === 2) {
        crumpList.push(this.setUpCompany());
      }
    }

    //Highlights the last "crumb" in black unless it's HOME
    if (crumpList.length - 1 !== 0) {
      crumpList[crumpList.length - 1] = (
        <Current>{crumpList[crumpList.length - 1]}</Current>
      );
    }

    return (
      <BreadCrumbContainer>
        {crumpList.map(crump => [crump, <Slash>{"/"}</Slash>])}
      </BreadCrumbContainer>
    );
  }
}

export default BreadCrumbs;
