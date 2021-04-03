/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubject = /* GraphQL */ `
  subscription OnCreateSubject {
    onCreateSubject {
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
export const onUpdateSubject = /* GraphQL */ `
  subscription OnUpdateSubject {
    onUpdateSubject {
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
export const onDeleteSubject = /* GraphQL */ `
  subscription OnDeleteSubject {
    onDeleteSubject {
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
export const onCreateDataType = /* GraphQL */ `
  subscription OnCreateDataType {
    onCreateDataType {
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
export const onUpdateDataType = /* GraphQL */ `
  subscription OnUpdateDataType {
    onUpdateDataType {
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
export const onDeleteDataType = /* GraphQL */ `
  subscription OnDeleteDataType {
    onDeleteDataType {
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
export const onCreateCrime = /* GraphQL */ `
  subscription OnCreateCrime {
    onCreateCrime {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCrime = /* GraphQL */ `
  subscription OnUpdateCrime {
    onUpdateCrime {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCrime = /* GraphQL */ `
  subscription OnDeleteCrime {
    onDeleteCrime {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSubjectUnapprovedWarrant = /* GraphQL */ `
  subscription OnCreateSubjectUnapprovedWarrant {
    onCreateSubjectUnapprovedWarrant {
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
export const onUpdateSubjectUnapprovedWarrant = /* GraphQL */ `
  subscription OnUpdateSubjectUnapprovedWarrant {
    onUpdateSubjectUnapprovedWarrant {
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
export const onDeleteSubjectUnapprovedWarrant = /* GraphQL */ `
  subscription OnDeleteSubjectUnapprovedWarrant {
    onDeleteSubjectUnapprovedWarrant {
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
export const onCreateUnapprovedWarrant = /* GraphQL */ `
  subscription OnCreateUnapprovedWarrant {
    onCreateUnapprovedWarrant {
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
export const onUpdateUnapprovedWarrant = /* GraphQL */ `
  subscription OnUpdateUnapprovedWarrant {
    onUpdateUnapprovedWarrant {
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
export const onDeleteUnapprovedWarrant = /* GraphQL */ `
  subscription OnDeleteUnapprovedWarrant {
    onDeleteUnapprovedWarrant {
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
export const onCreateSubjectApprovedWarrant = /* GraphQL */ `
  subscription OnCreateSubjectApprovedWarrant {
    onCreateSubjectApprovedWarrant {
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
export const onUpdateSubjectApprovedWarrant = /* GraphQL */ `
  subscription OnUpdateSubjectApprovedWarrant {
    onUpdateSubjectApprovedWarrant {
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
export const onDeleteSubjectApprovedWarrant = /* GraphQL */ `
  subscription OnDeleteSubjectApprovedWarrant {
    onDeleteSubjectApprovedWarrant {
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
export const onCreateApprovedWarrant = /* GraphQL */ `
  subscription OnCreateApprovedWarrant {
    onCreateApprovedWarrant {
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
export const onUpdateApprovedWarrant = /* GraphQL */ `
  subscription OnUpdateApprovedWarrant {
    onUpdateApprovedWarrant {
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
export const onDeleteApprovedWarrant = /* GraphQL */ `
  subscription OnDeleteApprovedWarrant {
    onDeleteApprovedWarrant {
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
export const onCreateTip = /* GraphQL */ `
  subscription OnCreateTip {
    onCreateTip {
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
export const onUpdateTip = /* GraphQL */ `
  subscription OnUpdateTip {
    onUpdateTip {
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
export const onDeleteTip = /* GraphQL */ `
  subscription OnDeleteTip {
    onDeleteTip {
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
export const onCreateFeedbacks = /* GraphQL */ `
  subscription OnCreateFeedbacks {
    onCreateFeedbacks {
      id
      content
      user
      version
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFeedbacks = /* GraphQL */ `
  subscription OnUpdateFeedbacks {
    onUpdateFeedbacks {
      id
      content
      user
      version
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFeedbacks = /* GraphQL */ `
  subscription OnDeleteFeedbacks {
    onDeleteFeedbacks {
      id
      content
      user
      version
      createdAt
      updatedAt
    }
  }
`;
