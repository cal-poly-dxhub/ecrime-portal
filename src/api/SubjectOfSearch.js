import { API, graphqlOperation } from 'aws-amplify';
import * as query from '../graphql/queries';
import * as mutations from '../graphql/mutations';

export const getSubjectsList = async () => {
  const response = await API.graphql(
    graphqlOperation(query.listSubjects, { limit: 5000 })
  );
  console.log('Retrieved all subjects', response.data.listSubjects.items);
  return response.data.listSubjects.items;
};

export const getSubject = async () => {
  const result = await API.graphql(
    graphqlOperation(query.getSubject, {
      id: window.location.pathname.split('/')[2] // get's the subjectId from the url
    })
  );

  console.log('Retrieved subject', result.data.getSubject);
  return result.data.getSubject;
};

export const createSubject = async values => {
  const result = await API.graphql(
    graphqlOperation(mutations.createSubject, { input: values })
  );
  console.log('Created new subject', result);
  return true;
};
