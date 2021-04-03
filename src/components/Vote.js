import React from "react";
import styled from "styled-components";

// import ArrowUp from "../../assets/icons/ArrowUp";
import SVGIcon from "../assets/icons/SVGIcon";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7px;
  margin-right: 20px;

  & * {
    margin: 0;
  }
  & p {
    color: #59b7b1;
    font-family: ".SFNSText", "SFProText-Regular", "SFUIText-Regular",
      ".SFUIText", sans-serif;
  }
  & svg:active {
    fill: #3d9690 !important;
  }
`;

const ArrowContainer = styled.button`
  border: none;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

const arrow = {
  width: "20px",
  cursor: "pointer",
  fill: "#59b7b1",
  transition: ".2s"
};

const Vote = props => {
  return (
    <MainContainer>
      <ArrowContainer onClick={props.upvote}>
        <SVGIcon name="ArrowUp" style={arrow} />
      </ArrowContainer>
      <p>{props.votes}</p>
      <ArrowContainer onClick={props.downvote}>
        <SVGIcon name="ArrowDown" style={arrow} />
      </ArrowContainer>
    </MainContainer>
  );
};

export default Vote;
