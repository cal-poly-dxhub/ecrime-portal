import { API, graphqlOperation } from 'aws-amplify';
import { listDataTypes2 } from '../graphql/queries2';

const filterDuplicates = (alist) => {
  let filteredList = [];
  let itemConents = [];

  alist.forEach(function (item) {
    if (!itemConents.includes(item.type)) {
      itemConents.push(item.type);
      filteredList.push(item);
    }
  });

  return filteredList;
};

export const getDataTypes = async () => {
  const LIMIT = 5000;
  const response = await API.graphql(
    graphqlOperation(listDataTypes2, { limit: LIMIT })
  );
  let filteredDataList = filterDuplicates(response.data.listDataTypes.items);
  console.log('getDataTypes', filteredDataList);
  return [{ types: '' }, ...filteredDataList];
};
