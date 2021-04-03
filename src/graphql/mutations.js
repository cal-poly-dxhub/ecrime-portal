/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSubject = /* GraphQL */ `
  mutation CreateSubject(
    $input: CreateSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    createSubject(input: $input, condition: $condition) {
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
export const updateSubject = /* GraphQL */ `
  mutation UpdateSubject(
    $input: UpdateSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    updateSubject(input: $input, condition: $condition) {
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
export const deleteSubject = /* GraphQL */ `
  mutation DeleteSubject(
    $input: DeleteSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    deleteSubject(input: $input, condition: $condition) {
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
export const createDataType = /* GraphQL */ `
  mutation CreateDataType(
    $input: CreateDataTypeInput!
    $condition: ModelDataTypeConditionInput
  ) {
    createDataType(input: $input, condition: $condition) {
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
export const updateDataType = /* GraphQL */ `
  mutation UpdateDataType(
    $input: UpdateDataTypeInput!
    $condition: ModelDataTypeConditionInput
  ) {
    updateDataType(input: $input, condition: $condition) {
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
export const deleteDataType = /* GraphQL */ `
  mutation DeleteDataType(
    $input: DeleteDataTypeInput!
    $condition: ModelDataTypeConditionInput
  ) {
    deleteDataType(input: $input, condition: $condition) {
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
export const createCrime = /* GraphQL */ `
  mutation CreateCrime(
    $input: CreateCrimeInput!
    $condition: ModelCrimeConditionInput
  ) {
    createCrime(input: $input, condition: $condition) {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const updateCrime = /* GraphQL */ `
  mutation UpdateCrime(
    $input: UpdateCrimeInput!
    $condition: ModelCrimeConditionInput
  ) {
    updateCrime(input: $input, condition: $condition) {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const deleteCrime = /* GraphQL */ `
  mutation DeleteCrime(
    $input: DeleteCrimeInput!
    $condition: ModelCrimeConditionInput
  ) {
    deleteCrime(input: $input, condition: $condition) {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const createSubjectUnapprovedWarrant = /* GraphQL */ `
  mutation CreateSubjectUnapprovedWarrant(
    $input: CreateSubjectUnapprovedWarrantInput!
    $condition: ModelSubjectUnapprovedWarrantConditionInput
  ) {
    createSubjectUnapprovedWarrant(input: $input, condition: $condition) {
      id
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
      warrant {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateSubjectUnapprovedWarrant = /* GraphQL */ `
  mutation UpdateSubjectUnapprovedWarrant(
    $input: UpdateSubjectUnapprovedWarrantInput!
    $condition: ModelSubjectUnapprovedWarrantConditionInput
  ) {
    updateSubjectUnapprovedWarrant(input: $input, condition: $condition) {
      id
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
      warrant {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteSubjectUnapprovedWarrant = /* GraphQL */ `
  mutation DeleteSubjectUnapprovedWarrant(
    $input: DeleteSubjectUnapprovedWarrantInput!
    $condition: ModelSubjectUnapprovedWarrantConditionInput
  ) {
    deleteSubjectUnapprovedWarrant(input: $input, condition: $condition) {
      id
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
      warrant {
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
      createdAt
      updatedAt
    }
  }
`;
export const createUnapprovedWarrant = /* GraphQL */ `
  mutation CreateUnapprovedWarrant(
    $input: CreateUnapprovedWarrantInput!
    $condition: ModelUnapprovedWarrantConditionInput
  ) {
    createUnapprovedWarrant(input: $input, condition: $condition) {
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
export const updateUnapprovedWarrant = /* GraphQL */ `
  mutation UpdateUnapprovedWarrant(
    $input: UpdateUnapprovedWarrantInput!
    $condition: ModelUnapprovedWarrantConditionInput
  ) {
    updateUnapprovedWarrant(input: $input, condition: $condition) {
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
export const deleteUnapprovedWarrant = /* GraphQL */ `
  mutation DeleteUnapprovedWarrant(
    $input: DeleteUnapprovedWarrantInput!
    $condition: ModelUnapprovedWarrantConditionInput
  ) {
    deleteUnapprovedWarrant(input: $input, condition: $condition) {
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
export const createSubjectApprovedWarrant = /* GraphQL */ `
  mutation CreateSubjectApprovedWarrant(
    $input: CreateSubjectApprovedWarrantInput!
    $condition: ModelSubjectApprovedWarrantConditionInput
  ) {
    createSubjectApprovedWarrant(input: $input, condition: $condition) {
      id
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
      warrant {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateSubjectApprovedWarrant = /* GraphQL */ `
  mutation UpdateSubjectApprovedWarrant(
    $input: UpdateSubjectApprovedWarrantInput!
    $condition: ModelSubjectApprovedWarrantConditionInput
  ) {
    updateSubjectApprovedWarrant(input: $input, condition: $condition) {
      id
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
      warrant {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteSubjectApprovedWarrant = /* GraphQL */ `
  mutation DeleteSubjectApprovedWarrant(
    $input: DeleteSubjectApprovedWarrantInput!
    $condition: ModelSubjectApprovedWarrantConditionInput
  ) {
    deleteSubjectApprovedWarrant(input: $input, condition: $condition) {
      id
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
      warrant {
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
      createdAt
      updatedAt
    }
  }
`;
export const createApprovedWarrant = /* GraphQL */ `
  mutation CreateApprovedWarrant(
    $input: CreateApprovedWarrantInput!
    $condition: ModelApprovedWarrantConditionInput
  ) {
    createApprovedWarrant(input: $input, condition: $condition) {
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
export const updateApprovedWarrant = /* GraphQL */ `
  mutation UpdateApprovedWarrant(
    $input: UpdateApprovedWarrantInput!
    $condition: ModelApprovedWarrantConditionInput
  ) {
    updateApprovedWarrant(input: $input, condition: $condition) {
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
export const deleteApprovedWarrant = /* GraphQL */ `
  mutation DeleteApprovedWarrant(
    $input: DeleteApprovedWarrantInput!
    $condition: ModelApprovedWarrantConditionInput
  ) {
    deleteApprovedWarrant(input: $input, condition: $condition) {
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
export const createTip = /* GraphQL */ `
  mutation CreateTip(
    $input: CreateTipInput!
    $condition: ModelTipConditionInput
  ) {
    createTip(input: $input, condition: $condition) {
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
export const updateTip = /* GraphQL */ `
  mutation UpdateTip(
    $input: UpdateTipInput!
    $condition: ModelTipConditionInput
  ) {
    updateTip(input: $input, condition: $condition) {
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
export const deleteTip = /* GraphQL */ `
  mutation DeleteTip(
    $input: DeleteTipInput!
    $condition: ModelTipConditionInput
  ) {
    deleteTip(input: $input, condition: $condition) {
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
export const createFeedbacks = /* GraphQL */ `
  mutation CreateFeedbacks(
    $input: CreateFeedbacksInput!
    $condition: ModelFeedbacksConditionInput
  ) {
    createFeedbacks(input: $input, condition: $condition) {
      id
      content
      user
      version
      createdAt
      updatedAt
    }
  }
`;
export const updateFeedbacks = /* GraphQL */ `
  mutation UpdateFeedbacks(
    $input: UpdateFeedbacksInput!
    $condition: ModelFeedbacksConditionInput
  ) {
    updateFeedbacks(input: $input, condition: $condition) {
      id
      content
      user
      version
      createdAt
      updatedAt
    }
  }
`;
export const deleteFeedbacks = /* GraphQL */ `
  mutation DeleteFeedbacks(
    $input: DeleteFeedbacksInput!
    $condition: ModelFeedbacksConditionInput
  ) {
    deleteFeedbacks(input: $input, condition: $condition) {
      id
      content
      user
      version
      createdAt
      updatedAt
    }
  }
`;
