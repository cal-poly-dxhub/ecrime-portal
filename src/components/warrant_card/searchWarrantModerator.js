import React, { useState } from 'react';
import styled from 'styled-components';
import {
  createApprovedWarrant,
  deleteDoc,
  deleteUnapprovedWarrant
} from '../../api/Warrant';
import SVGIcon from './../../assets/icons/SVGIcon';
import SearchWarrant from './searchWarrant';

const SearchWarrantModerator = props => {
  const [isVisible, setIsVisible] = useState(true);

  function reject() {
    deleteDoc(props.id);
    deleteUnapprovedWarrant(props.id, props.joinIds);
    setIsVisible(false);
  }

  function approve() {
    deleteUnapprovedWarrant(props.id, props.joinIds);
    const warrant = {
      id: props.id,
      content: props.content,
      county: props.county,
      creationYear: props.creationYear,
      isTemplate: props.isTemplate,
      state: props.state,
      crimes: props.crimes,
      dataTypes: props.dataTypes,
      uploadTimestamp: props.uploadTimestamp,
      votes: props.votes,
      subjectNames: props.subjectNames,
      approvedWarrantSubjectId: props.subjectId
    };
    createApprovedWarrant(warrant, props.id, props.joinIds);
    setIsVisible(false);
  }

  return (
    <div>
      {isVisible ? (
        <Container>
          <SearchWarrant {...props} isModerator={true} />
          <ChoiceContainer>
            <div onClick={reject}>
              <SVGIcon name={'Exit'} />
            </div>
            <div></div>
            <div onClick={approve}>
              <SVGIcon name={'Checkmark'} />
            </div>
          </ChoiceContainer>
        </Container>
      ) : null}
    </div>
  );
};

export default SearchWarrantModerator;

//Styles

const Container = styled.div`
  width: fit-content;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const ChoiceContainer = styled.div`
  width: 175px;
  height: 55px;
  border-radius: 50px;
  background: #7dd8d2;
  position: absolute;
  margin-top: 7px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2),
    inset 0px 0px 25px 0px rgba(89, 183, 177, 0.25);
  display: flex;
  align-items: center;
  text-align: center;
  z-index: 2;
  & div:nth-child(odd) {
    flex: 1;
    cursor: pointer;
    color: white;
    font-weight: 600;
    font-size: 17px;
    padding: 10px;
    transition: 0.2s;
    & * {
      fill: white;
      width: 12px;
    }
    &:hover {
      transform: scale(1.3);
    }
  }

  & div:nth-child(even) {
    content: '';
    display: inline-block;
    width: 0px;
    height: 70%;
    border-right: 1px solid #b5f1ed;
    padding: 0;
    flex: 0;
  }
`;
