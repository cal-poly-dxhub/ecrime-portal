import React from "react";
import styled from "styled-components";

import SVGIcon from "../assets/icons/SVGIcon";

const DeleteAndEditGroup = props => {
  return (
    <ModeratorContainer style={props.style}>
      {props.edit && (
        <SVGIcon
          onClick={props.edit}
          name={"Edit"}
          style={{ ...EditIcon, ...props.styleIcon }}
          color="#24252a"
          hoverColor="#63bbb6"
        />
      )}
      {props.delete && (
        <SVGIcon
          onClick={props.delete}
          name={"Delete"}
          style={{ ...DeleteIcon, ...props.styleIcon }}
          color="#24252a"
          hoverColor="#de1a1a"
        />
      )}
    </ModeratorContainer>
  );
};

export default DeleteAndEditGroup;

const ModeratorContainer = styled.div`
  display: flex;
  margin-left: 10px;
  margin-bottom: 10px;

  & * {
    margin-right: 4px;
  }
`;

const EditIcon = {
  width: 12,
  fill: "#24252a",
  right: 5,
  cursor: "pointer"
};

const DeleteIcon = {
  width: 12,
  fill: "#24252a",
  right: 5,
  cursor: "pointer"
};
