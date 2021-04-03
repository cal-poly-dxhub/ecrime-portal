import React from 'react';
import styled from 'styled-components';
import SearchWarrant from '../components/warrant_card/searchWarrant';

const SearchWarrantContainer = props => {
  const data = props.data;
  return (
    <Container>
      {data.map(sw => (
        <SearchWarrant key={sw.id} relavance={0} {...sw} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default SearchWarrantContainer;
