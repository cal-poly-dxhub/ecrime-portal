// HACK: These are custom queries that won't get overwritten by auto generated code in `queries.js`

//TODO: add why this is neccesary
export const listDataTypes2 = `query ListDataTypes(
  $filter: ModelDataTypeFilterInput
  $limit: Int
  $nextToken: String
) {
  listDataTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      type
    }
    nextToken
  }
}
`;

// NOTE: add `id` (items>subjects>items)
export const listUnapprovedWarrants2 = `query ListUnapprovedWarrants(
  $filter: ModelUnapprovedWarrantFilterInput
  $limit: Int
  $nextToken: String
) {
  listUnapprovedWarrants(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      content
      county
      creationYear
      isTemplate
      state
      subject {
        id
        name
        requestDescription
        privacyPolicyUrl
      }
      subjects {
        items{
          id
          subject{
            id
            name
          }
        }
        nextToken
      }
      crimes
      dataTypes
      uploadTimestamp
      votes
    }
    nextToken
  }
}
`;
