import React from "react";
import TypeOfData from "../components/typesOfData/TypeOfData";
import styled from "styled-components";

const DataTypesContainer = props => {
  const data = props.data;

  return (
    <Container>
      {data.map(dt => (
        <TypeOfData
          showNotifications={props.showNotifications}
          id={dt.id}
          title={dt.type}
        />
      ))}
    </Container>
    // null
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

export default DataTypesContainer;
