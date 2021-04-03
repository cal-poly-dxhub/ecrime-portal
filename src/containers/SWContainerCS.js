import React from 'react';
import styled from 'styled-components';
import SearchWarrant from '../components/warrant_card/searchWarrant';

/**
 * container warrants returned from search
 *
 * @param {json} hits // returned by CLOUDSEARCH
 */
const SearchWarrants = props => {
  const hits = props.hits;

  return (
    <Container>
      {hits.map(sw => (
        <SearchWarrant
          key={sw.id}
          id={sw.id}
          subjectName={sw.fields.subject_of_search}
          subjectNames={sw.fields.subjects_of_search}
          state={sw.fields.state}
          county={sw.fields.county}
          crimes={sw.fields.types_of_crime}
          content={sw.highlights.content}
          isTemplate={parseInt(sw.fields.is_template[0])}
          uploadTimestamp={sw.fields.upload_timestamp}
          votes={sw.fields.votes}
          relavance={sw.fields._score}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default SearchWarrants;
