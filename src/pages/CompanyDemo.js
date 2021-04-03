import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getSubjectsList } from "../api/SubjectOfSearch";
import companyBuilderForm from "../components/companyBuilder/companyBuilderForm";
import GreyButton from "../components/greyButton";
import { SUBJECT_OF_SEARCH_ROUTE } from "../Routes";

const Title = styled.h2`
  padding-top: 20px;
`;

const CompanyButton = styled.button`
  border-radius: 10px;
  color: grey;
  border-color: grey;
  padding: 7px;
  margin: 4px;

  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
  &:focus {
    outline: 0;
  }
  &:hover {
    border-color: black;
    color: black;
  }
`;

const CompanyDemo = (props) => {
  const [data, setData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getSubjectsList().then((response) => setData(response));
  }, []);

  const handleClick = (id) => {
    const path = SUBJECT_OF_SEARCH_ROUTE + id;
    history.push(path);
  };

  return data ? (
    <div>
      <GreyButton
        buttonText="Create Subject of Search"
        destination={companyBuilderForm}
        style={{ paddingTop: 10, float: "right" }}
        showNotifications={props.showNotifications}
      />
      <Title>Subjects of Search</Title>
      {data.map((c) => (
        <CompanyButton key={c.id} onClick={() => handleClick(c.id)}>
          {c.name}
        </CompanyButton>
      ))}
    </div>
  ) : null;
};

export default CompanyDemo;
