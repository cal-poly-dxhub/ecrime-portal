import React, { useState, useContext } from "react";
import { UserContext } from "../../Usercontext";
import styled from "styled-components";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

import DeleteAndEditGroup from "../DeleteAndEditGroup";
import TypesOfDataEditor from "../typesOfData/TypesOfDataEditor";
import { Transition, animated } from "react-spring/renderprops";

const TypeOfData = props => {
  const user = useContext(UserContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dataTypeValue, setDataTypeValue] = useState(props.title);

  const showChild = () => {
    setIsVisible(true);
  };

  const hideChild = () => {
    setIsVisible(false);
  };

  const Delete = async () => {
    const isDeleting = window.confirm(
      "Are you sure you want to delete this data type?"
    );
    if (isDeleting) {
      await API.graphql(
        graphqlOperation(mutations.deleteDataType, {
          input: {
            id: props.id
          }
        })
      ).then(result => {
        console.log("SUCCESS: datatype deleted");
        setIsDeleted(true);
        return true;
      });
    }
  };

  const updateTypeOfData = async newType => {
    await API.graphql(
      graphqlOperation(mutations.updateDataType, {
        input: {
          id: props.id,
          type: newType
        }
      })
    ).then(result => {
      console.log("SUCCESS: upated type of data");
      hideChild();
      return true;
    });
  };

  const { showNotifications } = props;
  return (
    <div>
      {!isDeleted && (
        <div>
          <Container>
            <Title>{dataTypeValue}</Title>
            {user.userGroup === "Moderator" ? (
              <DeleteAndEditGroup
                edit={() => showChild()}
                delete={() => Delete()}
              />
            ) : null}
          </Container>
          <Transition
            native
            items={isVisible}
            from={{
              opacity: 0,
              zoom: 1.2
            }}
            enter={{ opacity: 1, zoom: 0.8 }}
            leave={{ opacity: 0, zoom: 1.2 }}
            config={{ duration: 300 }}
          >
            {show =>
              show &&
              (props => (
                <animated.div style={props}>
                  <TypesOfDataEditor
                    close={() => hideChild()}
                    currentDataType={dataTypeValue}
                    setDataTypeValue={setDataTypeValue.bind(this)}
                    updateFunction={updateTypeOfData.bind(this)}
                    showNotifications={showNotifications}
                  />
                </animated.div>
              ))
            }
          </Transition>
        </div>
      )}
    </div>
  );
};

export default TypeOfData;

// Styling

const Container = styled.div`
  display: flex;
`;

const Title = styled.h3`
  font-weight: 400;
  font-size: 22px;
  font-family: Helvetica, sans-serif;
`;
