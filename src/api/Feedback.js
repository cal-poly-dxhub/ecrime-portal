import { API, graphqlOperation } from "aws-amplify";
import { createFeedbacks } from "../graphql/mutations";

//Creates a feedback in the backend
export const createFeedback = async (values) => {
  const result = await API.graphql(
    graphqlOperation(createFeedbacks, { input: values })
  );
  console.log("Created new feedback", result);
  return true;
};
