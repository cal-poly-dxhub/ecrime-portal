import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUnapprovedWarrants } from '../api/Warrant';
import SearchWarrantModerator from '../components/warrant_card/searchWarrantModerator';
import { UserContext } from '../Usercontext';

const SWModerator = props => {
  const user = useContext(UserContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    getUnapprovedWarrants().then(response => setData(response));
  }, []);

  const getSubjectNames = subjects => {
    var subjectNames = [];
    subjects.map(subject => subjectNames.push(subject.subject.name));
    return subjectNames;
  };

  const getSubjectIds = subjects => {
    var subjectIds = [];
    subjects.map(subject => subjectIds.push(subject.subject.id));
    return subjectIds;
  };

  const getJoinIds = subjects => {
    var joinIds = [];
    subjects.map(subject => joinIds.push(subject.id));
    return joinIds;
  };

  return (
    <div>
      {data !== null && user.userGroup === 'Moderator' ? (
        <Container>
          {data.map(sw => (
            <SearchWarrantModerator
              key={sw.id}
              id={sw.id}
              subjectName={sw.subjects.items[0].subject.name} // FIXME: iterate through all subjects of search
              subjectId={sw.subjects.items[0].subject.id} // FIXME: iterate through all subjects of search
              subjectNames={getSubjectNames(sw.subjects.items)}
              subjectIds={getSubjectIds(sw.subjects.items)}
              joinIds={getJoinIds(sw.subjects.items)}
              state={sw.state}
              county={sw.county}
              crimes={sw.crimes}
              dataTypes={sw.dataTypes}
              content={sw.content}
              isTemplate={sw.isTemplate}
              creationYear={sw.creationYear}
              uploadTimestamp={sw.uploadTimestamp}
              votes={sw.votes}
              relavance={0}
            />
          ))}
        </Container>
      ) : null}
      {data !== null && user.userGroup === 'Moderator' && data.length === 0 ? (
        <div>
          <h2>There are no warrants to review.</h2>
          <p>Add warrants by navigating to Subjects of Search tab.</p>
        </div>
      ) : null}
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default SWModerator;
