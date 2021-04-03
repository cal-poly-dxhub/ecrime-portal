import { API, graphqlOperation } from 'aws-amplify';
import * as query from '../graphql/queries';

export const getCrimeList = async () => {
  const response = await API.graphql(
    graphqlOperation(query.listCrimes, { limit: 5000 })
  );
  console.log('getCrimes', response.data.listCrimes.items);
  return [{ name: '' }, ...response.data.listCrimes.items];
};
