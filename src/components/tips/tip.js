import React, { useState, useContext } from "react";
import { UserContext } from "../../Usercontext";
import styled from "styled-components";
import Vote from "../Vote";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

import DeleteAndEditGroup from "../DeleteAndEditGroup";
import TipEditor from "../tipUploader/tipEditor";
import { Transition, animated } from "react-spring/renderprops";

const Voting = props => {
  const [votes, setVotes] = useState(props.votes);

  const updateVotes = async (newVoteCount, message) => {
    setVotes(newVoteCount);
    const data = {
      id: props.id,
      votes: newVoteCount
    };
    API.graphql(graphqlOperation(mutations.updateTip, { input: data })).then(
      result => {
        console.log("SUCCESS: " + message);
        console.log(result);
      }
    );
  };

  return (
    <Vote
      votes={votes}
      upvote={() => updateVotes(parseInt(votes) + 1, "+1")}
      downvote={() => updateVotes(parseInt(votes) - 1, "-1")}
    />
  );
};

const TipContents = props => {
  return (
    <div>
      <TitleContainer>
        <Title>{props.headline}</Title>
      </TitleContainer>

      <SubTitle>{props.body}</SubTitle>
      <PostInfoContainer>
        <User>By {props.authorName}</User>
        <Source>Source: {props.source}</Source>
      </PostInfoContainer>
    </div>
  );
};

const Tip = props => {
  const user = useContext(UserContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [headLine, setHeadLine] = useState(props.headline);
  const [body, setBody] = useState(props.body);
  const [source, setSource] = useState(props.source);

  const showChild = () => {
    setIsVisible(true);
  };

  const hideChild = () => {
    setIsVisible(false);
  };

  const updateTip = async (newHeadline, newBody, newSource) => {
    await API.graphql(
      graphqlOperation(mutations.updateTip, {
        input: {
          id: props.id,
          headline: newHeadline,
          body: newBody,
          source: newSource
        }
      })
    ).then(result => {
      console.log("SUCCESS: upated tip");
      console.log(result);
      hideChild();
      return true;
    });
  };

  const Delete = async () => {
    const isDeleting = window.confirm(
      "Are you sure you want to delete this tip?"
    );
    if (isDeleting) {
      await API.graphql(
        graphqlOperation(mutations.deleteTip, {
          input: {
            id: props.id
          }
        })
      ).then(result => {
        console.log("SUCCESS: tip deleted");
        setIsDeleted(true);
        return true;
      });
    }
  };

  const { showNotifications } = props;

  return (
    <div>
      {!isDeleted && (
        <div>
          <Container>
            {user.userGroup === "Moderator" ? (
              <DeleteAndEditGroup
                style={{
                  position: "absolute",
                  marginTop: "25px",
                  right: "25%"
                }}
                edit={() => showChild()}
                delete={() => Delete()}
              />
            ) : null}
            <Voting {...props} />
            <TipContents
              {...props}
              headline={headLine}
              body={body}
              source={source}
            />
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
                  <TipEditor
                    close={() => hideChild()}
                    updateFunction={updateTip.bind(this)}
                    showNotifications={showNotifications}
                    currentHeadline={headLine}
                    currentDetails={body}
                    currentSource={source}
                    setHeadline={setHeadLine.bind(this)}
                    setBody={setBody.bind(this)}
                    setSource={setSource.bind(this)}
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

export default Tip;

//Styles
const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  margin-bottom: 15px;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-top: 0px;
  margin-bottom: 7px;
  flex: 1;
`;

const SubTitle = styled.p`
  font-size: 16px;
  margin-top: 0px;
  margin-bottom: 5px;
`;

const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const User = styled.p`
  color: #bfc7d4;
  font-size: 12px;
  margin: 0;
  flex: 1;
`;

const Source = styled.p`
  color: #bfc7d4;
  font-size: 12px;
  font-style: italic;
  margin: 0;
`;
