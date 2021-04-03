import React, { useState, useContext } from "react";
import { UserContext } from "../../Usercontext";

import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

import { Transition, animated } from "react-spring/renderprops";

import HowToRequestEvidenceEditor from "./HowToRequestEvidenceEditor";
import DeleteAndEditGroup from "../DeleteAndEditGroup";

const HowToRequestEvidence = props => {
  const user = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);
  const [instruction, setInstruction] = useState(props.content);

  const showChild = () => {
    setIsVisible(true);
  };

  const hideChild = () => {
    setIsVisible(false);
  };

  const updateContent = async newContent => {
    console.log(newContent);
    await API.graphql(
      graphqlOperation(mutations.updateSubject, {
        input: {
          id: props.id,
          requestDescription: newContent
        }
      })
    ).then(result => {
      console.log("SUCCESS: upated How to Request Evidence");
      console.log(result);
      hideChild();
      return true;
    });
  };

  const { showNotifications } = props;
  return (
    <div>
      {user.userGroup === "Moderator" ? (
        <div>
          <DeleteAndEditGroup
            style={{
              position: "absolute",
              right: "25%"
            }}
            edit={() => showChild()}
          />
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
                  <HowToRequestEvidenceEditor
                    close={() => hideChild()}
                    updateFunction={updateContent.bind(this)}
                    showNotifications={showNotifications}
                    currentInstruction={instruction}
                    setInstruction={setInstruction.bind(this)}
                  />
                </animated.div>
              ))
            }
          </Transition>
        </div>
      ) : null}
      <p>{instruction}</p>
    </div>
  );
};

export default HowToRequestEvidence;
