import API, { graphqlOperation } from '@aws-amplify/api';
import { Auth, Storage } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { listUnapprovedWarrants2 } from '../graphql/queries2';

// Data for Warrants is stored in 3 places: S3, Dynamo, and CloudSearch.

// S3
// stores the original document uploaded by the user
const S3_PATH = 'warrants/';
const SECONDS_BEFORE_EXPIRES = 60;

export const uploadDocToS3 = async (filename, content, type, setSubmitting) => {
  const path = S3_PATH + filename;
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;

  Storage.put(path, content, {
    progressCallback(progress) {
      console.log(`upload status: ${progress.loaded}/${progress.total}`);
    },
    contentType: type,
    Authorization: token
  })
    .then(result => console.log('Uploaded warrant document', result))
    .catch(err => console.log(err));
};

export const downloadDocFromS3 = filename => {
  const path = S3_PATH + filename;
  Storage.get(path, { expires: SECONDS_BEFORE_EXPIRES })
    .then(result => {
      console.log('Downloaded warrent document', result);
      window.open(result);
    })
    .catch(err => console.log(err));
};

export const deleteDoc = filename => {
  const path = S3_PATH + filename;
  Storage.remove(path)
    .then(result => console.log('Delete warrant document', result))
    .catch(err => console.log(err));
};

// DYNAMO DB
// stores metadata about warrants
const multiApiCall = async (list, func) => {
  return Promise.all(list.map(joinId => func(joinId)));
};

const createUnapprovedJoins = async (id, subjectIds) => {
  var curSub = 1;
  subjectIds.map(sub =>
    API.graphql(
      graphqlOperation(mutations.createSubjectUnapprovedWarrant, {
        input: {
          subjectUnapprovedWarrantSubjectId: sub,
          subjectUnapprovedWarrantWarrantId: id
        }
      })
    )
      .then(result => {
        console.log(
          `Linked warrant to ${curSub}/${subjectIds.length} subjects`,
          result
        );
        curSub++;
      })
      .catch(err => console.log(err))
  );
};

const createApprovedJoins = async (id, subjectIds) => {
  return Promise.all(
    subjectIds.map(joinId => createSubjectApprovedWarrant(id, joinId))
  );
};

const createSubjectApprovedWarrant = async (id, subject) => {
  return API.graphql(
    graphqlOperation(mutations.createSubjectApprovedWarrant, {
      input: {
        subjectApprovedWarrantSubjectId: subject,
        subjectApprovedWarrantWarrantId: id
      }
    })
  );
};

const deleteSubjectUnapprovedWarrant = async joinId => {
  return API.graphql(
    graphqlOperation(mutations.deleteSubjectUnapprovedWarrant, {
      input: { id: joinId }
    })
  );
};

export const createUnapprovedWarrant = async (warrant, id, subjectIds) => {
  API.graphql(
    graphqlOperation(mutations.createUnapprovedWarrant, { input: warrant })
  )
    .then(result => {
      console.log('Created warrant', result);
      createUnapprovedJoins(id, subjectIds);
    })
    .catch(err => console.log(err));
};

export const getUnapprovedWarrants = async () => {
  const result = await API.graphql(graphqlOperation(listUnapprovedWarrants2));

  console.log('retrieved unapproved warrants', result);
  return result.data.listUnapprovedWarrants.items;
};

export const deleteUnapprovedWarrant = (id, joinIds) => {
  multiApiCall(joinIds, deleteSubjectUnapprovedWarrant).then(data => {
    console.log('Unlinked warrants', data);
    API.graphql(
      graphqlOperation(mutations.deleteUnapprovedWarrant, {
        input: { id: id }
      })
    )
      .then(result => {
        console.log('Delete unapproved warrant metadata', result);
      })
      .catch(err => console.log(err));
  });
};

// NOTE: this throws an error, but from testing appears to be working
export const createApprovedWarrant = async (warrant, id, joinIds) => {
  API.graphql(
    graphqlOperation(mutations.createApprovedWarrant, { input: warrant })
  )
    .then(result => {
      console.log('Created approved warrant', result);
      createApprovedJoins(id, joinIds);
    })
    .catch(err => console.log(err));
};

export const deleteApprovedWarrant = async id => {
  await API.graphql(
    graphqlOperation(mutations.deleteApprovedWarrant, {
      input: { id: id }
    })
  )
    .then(result => console.log('Deleted approved warrant', result))
    .catch(err => console.log(err));
};

// Cloudsearch
// copy of the metadata stored in Dynamo
export const searchWarrants = async query => {
  const apiName = 'api776dd70e';
  const path = '/warrant';
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;

  const myInit = {
    response: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    queryStringParameters: {
      q: query // TODO: replace with real search term
    }
  };
  const result = await API.get(apiName, path, myInit)
    .then(response => response)
    .catch(response => console.log('error', response));

  console.log(`Searched cloudsearch for '${query}'`, result.data);
  return result.data;
};
