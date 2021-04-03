import { API, graphqlOperation } from 'aws-amplify';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {
  deleteApprovedWarrant,
  deleteDoc,
  downloadDocFromS3
} from '../../api/Warrant';
import downloadIcon from '../../assets/icons/download.svg';
import isTemplateIcon from '../../assets/icons/isTemplate.svg';
import * as mutations from '../../graphql/mutations';
import { UserContext } from '../../Usercontext';
import DeleteAndEditGroup from '../DeleteAndEditGroup';
import Vote from '../Vote';

const highLightWords = (excerpt, keywordsList) => {
  const regex = /[.,\s]/g;

  let excerptList = excerpt.split(' ');

  let newList = [''];

  for (let i = 0; i < excerptList.length; i++) {
    let filteredWord = excerptList[i].replace(regex, '');
    if (keywordsList.includes(filteredWord)) {
      //if its a keyword
      newList[newList.length] = excerptList[i];
      newList[newList.length] = '';
    } else {
      newList[newList.length - 1] += excerptList[i] + ' ';
    }
  }

  return [newList, keywordsList];
};

const renderHighlights = excerpt => {
  let splitList = excerpt.split('**');
  let keywords = [];
  for (let i = 1; i < splitList.length; i += 2) {
    if (!keywords.includes(splitList[i])) {
      keywords.push(splitList[i]);
    }
  }

  let fullExcerpt = splitList.join('');
  return highLightWords(fullExcerpt, keywords);
};

const reduceSentence = (content, quantity) => {
  let splitList = content.split(' ');
  let newList = [];

  for (let i = splitList.length; i >= 0; i--) {
    if (splitList.length - i > quantity) {
      break;
    }
    newList.push(splitList[i]);
  }
  newList.reverse();
  return newList.join(' ');
};

//Converts regular date format to user friendly format based on the range of dates
const dateToDays = date => {
  let date1 = new Date(date);
  let date2 = new Date();
  let diffTime = Math.abs(date2.getTime() - date1.getTime());
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays - 1 > 99) {
    //return regular date if it's been >99 days
    return (
      date1.getMonth() + 1 + '/' + date1.getDate() + '/' + date1.getFullYear()
    );
  }
  if (diffDays - 1 === 1) {
    return '1 day ago';
  } else if (diffDays - 1 > 1) {
    return diffDays - 1 + ' days ago';
  } else {
    return 'Today';
  }
};

/**
 * Search Warrant Preview Card
 *
 * @param {string} subjectName
 * @param {string} state
 * @param {array} crimes
 * @param {double} relavance
 * @param {double} votes
 * @param {bool} isTemplate
 * @param {string} uploadTimestamp
 * @param {string} content
 */
const SearchWarrant = props => {
  const user = useContext(UserContext);
  const [votes, setVotes] = useState(props.votes);
  const [isDeleted, setIsDeleted] = useState(false);

  let relevancyColor =
    parseInt(props.relavance) > 79
      ? '#59B7B1'
      : parseInt(props.relavance) > 50
      ? '#186B87'
      : '#1D477F;';

  //handle displaying state and badge
  let validCounty = props.county ? true : false;
  let validState = props.state ? true : false;
  var seal = validState
    ? require('../../assets/seals/' + props.state + '.png')
    : null;

  //handle preparing a list of crimes to fit on the card
  let crimeListCount = 0;
  let crimeListLimit = 88;
  let crimeList = [];
  let crimeListLength = Array.isArray(props.crimes) ? props.crimes.length : 0;
  let fullList = false;
  for (let i = 0; i < crimeListLength; i++) {
    let crime = props.crimes[i];
    if (crimeListCount + crime.length < crimeListLimit) {
      crimeList.push(crime);
      crimeListCount += crime.length;
    } else {
      fullList = true;
    }
  }

  //handle isTemplate
  let isTemplate = props.isTemplate ? true : false;

  //handle displaying the excerpt
  let RenderExcerpt = () => {
    if (props.content != null) {
      const regex = /[.,\s]/g;

      let contentInfo = renderHighlights(props.content);
      let excerptContent = contentInfo[0];
      let keywords = contentInfo[1];
      excerptContent[0] = reduceSentence(excerptContent[0], 30);
      return (
        <p>
          {excerptContent.map((word, index) => {
            let filteredWord = word.replace(regex, '');
            if (keywords.includes(filteredWord)) {
              return <b key={index}>{word} </b>;
            } else {
              return <span key={index}>{word} </span>;
            }
          })}
        </p>
      );
    }
    return null;
  };

  const updateVotes = async (newVoteCount, message) => {
    setVotes(newVoteCount);

    const warrant = {
      id: props.id,
      votes: newVoteCount
    };
    API.graphql(
      graphqlOperation(mutations.updateApprovedWarrant, { input: warrant })
    ).then(result => {
      console.log('SUCCESS: ' + message);
      console.log(result);
    });
  };

  //Delete function for moderators
  const Delete = async () => {
    const isDeleting = window.confirm(
      'Are you sure you want to delete this warrant?'
    );
    if (isDeleting) {
      console.log('Deleted Warrant');
      setIsDeleted(true);
      deleteApprovedWarrant(props.id);
      deleteDoc(props.id);
      // await API.graphql(
      //   graphqlOperation(mutations.deleteTip, {
      //     input: {
      //       id: props.id
      //     }
      //   })
      // ).then(result => {
      //   console.log("SUCCESS: warrant deleted");
      //   return true;
      // });
    }
  };

  return (
    <div>
      {!isDeleted && (
        <SearchWarrantContainer>
          <TopContainer>
            <RankingBlock>
              {!props.isModerator && (
                <Vote
                  votes={votes}
                  upvote={() => updateVotes(parseInt(votes) + 1, '+1')}
                  downvote={() => updateVotes(parseInt(votes) - 1, '-1')}
                />
              )}
            </RankingBlock>
            <InfoBlock>
              <div className="stateContainer">
                {validCounty && <h6>County of {props.county}</h6>}
              </div>
              {props.subjectNames ? (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {props.subjectNames.map(subjectName => {
                    const text = `${subjectName} `;
                    return <h2>{text}</h2>;
                  })}
                </div>
              ) : (
                <h2>ERROR: missing subject</h2>
              )}

              <p>
                {crimeList.map((crime, index) => (
                  <span key={index}>{crime}</span>
                ))}
                {fullList && <span id="more">more...</span>}
              </p>
            </InfoBlock>

            <StatePictureBlock>
              <img src={seal} alt={props.state} />
            </StatePictureBlock>
          </TopContainer>

          <ExcerptContainer
            onClick={() => downloadDocFromS3(props.id)}
            download
          >
            <DownloadPreview className="downloadHover">
              <img src={downloadIcon} alt="DOWNLOAD" />
            </DownloadPreview>
            <RenderExcerpt />
          </ExcerptContainer>

          <BottomContainer>
            {user.userGroup === 'Moderator' && !props.isModerator ? (
              <DeleteAndEditGroup
                style={{ height: '12px' }}
                delete={() => Delete()}
              />
            ) : null}

            <DateElement>{dateToDays(props.uploadTimestamp)}</DateElement>

            {!props.isModerator && (
              <RelavanceScore relevancyColor={relevancyColor}>
                {Math.round(props.relavance * 100) / 100}
              </RelavanceScore>
            )}
          </BottomContainer>
          {isTemplate && <IsTemplate src={isTemplateIcon} />}
        </SearchWarrantContainer>
      )}
    </div>
  );
};

export default SearchWarrant;

//Styles
const SearchWarrantContainer = styled.div`
  height: 216px;
  width: 380px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0px;
  overflow: hidden;
  cursor: pointer;
  border-style: solid;
  box-sizing: content-box;
  border-width: 0px;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  margin: 14px;
  transition: 0.2s;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const TopContainer = styled.div`
  display: flex;
  padding: 5px 5px 0px;
  margin-top: 3px;
`;
const InfoBlock = styled.div`
  width: 100%;
  & .stateContainer {
    height: 10px;
    margin-top: 6px;
  }
  & h6 {
    color: #b1acac;
    font-size: 9px;
    margin-top: 0px;
    font-weight: 100;
    font-family: 'Helvetica-Bold', 'Helvetica', sans-serif;

    margin-bottom: 0;
    text-transform: uppercase;
  }
  & h2 {
    color: black;
    font-size: 22px;
    font-weight: 600;
    font-family: 'Helvetica-Bold', 'Helvetica', sans-serif;
    margin-top: 3px;
    margin-bottom: 0px;
  }
  & p {
    margin: 0;
    line-height: 0.8;
    width: 232px;

    & span {
      margin: 0;
      display: contents;
      font-size: 10px;
      font-family: 'Helvetica-Bold', 'Helvetica', sans-serif;
      color: #1d477f;
    }
    & #more {
      color: #59b7b1;
    }
    & span + span::before {
      content: ' • ';
    }
  }
`;
const StatePictureBlock = styled.div`
  margin-right: 5px;
  & img {
    width: 75px;
  }
`;
const RankingBlock = styled.div`
  display: block;
  margin-left: 5px;
  margin-right: 5px;
  & > * {
    display: block;
    text-align: center;
    color: #7ac5c1;
    font-size: 16px;
    font-weight: 700;
    font-family: '.SFNSText', 'SFProText-Regular', 'SFUIText-Regular',
      '.SFUIText', sans-serif;
    margin: 5px;
  }
  & svg path:hover {
    fill: #186b87;
  }
`;

const ExcerptContainer = styled.a`
  width: 100%;
  height: 43%;
  overflow: hidden;
  text-decoration: none;
  transition: 0.5s;
  & .downloadHover img {
    position: relative;
    top: -15px;
    transition: 0.2s;
  }
  &:hover {
    .downloadHover {
      opacity: 1;
    }
    .downloadHover img {
      top: 12px;
    }
    p {
      filter: blur(1px);
    }
  }
  & p {
    font-size: 10px;
    padding: 0 20px;
    margin: 0;
    color: #4b4b4b;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  height: 17px;
  position: relative;
  bottom: -7px;
`;
const RelavanceScore = styled.div`
  font-family: 'Helvetica-Bold', 'Helvetica', sans-serif;
  color: ${props => props.relevancyColor};
  font-size: 15px;
  font-weight: 700;
  text-align: right;
  margin-right: 23px;
  position: relative;
  bottom: 5px;
`;
const DateElement = styled.div`
  font-family: 'Helvetica', 'Helvetica', sans-serif;
  color: #b1acac;
  font-size: 9px;
  width: 100%;
  text-align: left;
  margin-left: 26px;
  position: relative;
  bottom: 0px;
`;

const DownloadPreview = styled.div`
  width: 100%;
  height: inherit;
  background: rgba(255, 255, 255, 0.75);
  z-index: 2;
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
  position: absolute;
  opacity: 0;
  transition: 0.5s;
  & img {
    width: 45px;
  }
`;

const IsTemplate = styled.img`
  position: absolute;
  width: 25px;
  height: 25px;
  top: 7px;
  right: 7px;
`;
