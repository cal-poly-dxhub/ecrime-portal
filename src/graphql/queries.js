/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubject = /* GraphQL */ `
  query GetSubject($id: ID!) {
    getSubject(id: $id) {
      id
      name
      dataTypes {
        items {
          id
          type
          endorsements
          createdAt
          updatedAt
        }
        nextToken
      }
      requestDescription
      privacyPolicyUrl
      unapprovedWarrants {
        items {
          id
          content
          county
          creationYear
          isTemplate
          state
          crimes
          dataTypes
          uploadTimestamp
          votes
          createdAt
          updatedAt
        }
        nextToken
      }
      approvedWarrants {
        items {
          id
          content
          county
          creationYear
          isTemplate
          state
          subjectName
          subjectNames
          crimes
          dataTypes
          votes
          uploadTimestamp
          createdAt
          updatedAt
        }
        nextToken
      }
      unapprovedWarrantsTemp {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      approvedWarrantsTemp {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      tips {
        items {
          id
          authorEmail
          authorName
          body
          source
          headline
          votes
          createAt
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSubjects = /* GraphQL */ `
  query ListSubjects(
    $filter: ModelSubjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        dataTypes {
          nextToken
        }
        requestDescription
        privacyPolicyUrl
        unapprovedWarrants {
          nextToken
        }
        approvedWarrants {
          nextToken
        }
        unapprovedWarrantsTemp {
          nextToken
        }
        approvedWarrantsTemp {
          nextToken
        }
        tips {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDataType = /* GraphQL */ `
  query GetDataType($id: ID!) {
    getDataType(id: $id) {
      id
      type
      endorsements
      subjects {
        id
        name
        dataTypes {
          nextToken
        }
        requestDescription
        privacyPolicyUrl
        unapprovedWarrants {
          nextToken
        }
        approvedWarrants {
          nextToken
        }
        unapprovedWarrantsTemp {
          nextToken
        }
        approvedWarrantsTemp {
          nextToken
        }
        tips {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listDataTypes = /* GraphQL */ `
  query ListDataTypes(
    $filter: ModelDataTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDataTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        endorsements
        subjects {
          id
          name
          requestDescription
          privacyPolicyUrl
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCrime = /* GraphQL */ `
  query GetCrime($id: ID!) {
    getCrime(id: $id) {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const listCrimes = /* GraphQL */ `
  query ListCrimes(
    $filter: ModelCrimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCrimes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        count
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUnapprovedWarrant = /* GraphQL */ `
  query GetUnapprovedWarrant($id: ID!) {
    getUnapprovedWarrant(id: $id) {
      id
      content
      county
      creationYear
      isTemplate
      state
      subject {
        id
        name
        dataTypes {
          nextToken
        }
        requestDescription
        privacyPolicyUrl
        unapprovedWarrants {
          nextToken
        }
        approvedWarrants {
          nextToken
        }
        unapprovedWarrantsTemp {
          nextToken
        }
        approvedWarrantsTemp {
          nextToken
        }
        tips {
          nextToken
        }
        createdAt
        updatedAt
      }
      subjects {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      crimes
      dataTypes
      uploadTimestamp
      votes
      createdAt
      updatedAt
    }
  }
`;
export const listUnapprovedWarrants = /* GraphQL */ `
  query ListUnapprovedWarrants(
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
          createdAt
          updatedAt
        }
        subjects {
          nextToken
        }
        crimes
        dataTypes
        uploadTimestamp
        votes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getApprovedWarrant = /* GraphQL */ `
  query GetApprovedWarrant($id: ID!) {
    getApprovedWarrant(id: $id) {
      id
      content
      county
      creationYear
      isTemplate
      state
      subject {
        id
        name
        dataTypes {
          nextToken
        }
        requestDescription
        privacyPolicyUrl
        unapprovedWarrants {
          nextToken
        }
        approvedWarrants {
          nextToken
        }
        unapprovedWarrantsTemp {
          nextToken
        }
        approvedWarrantsTemp {
          nextToken
        }
        tips {
          nextToken
        }
        createdAt
        updatedAt
      }
      subjects {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      subjectName
      subjectNames
      crimes
      dataTypes
      votes
      uploadTimestamp
      createdAt
      updatedAt
    }
  }
`;
export const listApprovedWarrants = /* GraphQL */ `
  query ListApprovedWarrants(
    $filter: ModelApprovedWarrantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApprovedWarrants(
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
          createdAt
          updatedAt
        }
        subjects {
          nextToken
        }
        subjectName
        subjectNames
        crimes
        dataTypes
        votes
        uploadTimestamp
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTip = /* GraphQL */ `
  query GetTip($id: ID!) {
    getTip(id: $id) {
      id
      authorEmail
      authorName
      body
      source
      subject {
        id
        name
        dataTypes {
          nextToken
        }
        requestDescription
        privacyPolicyUrl
        unapprovedWarrants {
          nextToken
        }
        approvedWarrants {
          nextToken
        }
        unapprovedWarrantsTemp {
          nextToken
        }
        approvedWarrantsTemp {
          nextToken
        }
        tips {
          nextToken
        }
        createdAt
        updatedAt
      }
      headline
      votes
      createAt
      createdAt
      updatedAt
    }
  }
`;
export const listTips = /* GraphQL */ `
  query ListTips(
    $filter: ModelTipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorEmail
        authorName
        body
        source
        subject {
          id
          name
          requestDescription
          privacyPolicyUrl
          createdAt
          updatedAt
        }
        headline
        votes
        createAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFeedbacks = /* GraphQL */ `
  query GetFeedbacks($id: ID!) {
    getFeedbacks(id: $id) {
      id
      content
      user
      version
      createdAt
      updatedAt
    }
  }
`;
export const listFeedbackss = /* GraphQL */ `
  query ListFeedbackss(
    $filter: ModelFeedbacksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeedbackss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        user
        version
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchUnapprovedWarrants = /* GraphQL */ `
  query SearchUnapprovedWarrants(
    $filter: SearchableUnapprovedWarrantFilterInput
    $sort: SearchableUnapprovedWarrantSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchUnapprovedWarrants(
      filter: $filter
      sort: $sort
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
          createdAt
          updatedAt
        }
        subjects {
          nextToken
        }
        crimes
        dataTypes
        uploadTimestamp
        votes
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
