import React, { Button } from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import DragDropBox from "./dropzone";
import { API, Storage, graphqlOperation } from "aws-amplify";

const Basic = () => {
  const uploadDocToS3 = async (filename, content, type, setSubmitting) => {
    const path = "uploaded/" + filename;

    Storage.put(path, content, {
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
      contentType: type
    })
      .then(result => {
        console.log("SUCCESS: uploaded file to S3 for conversion");
        console.log(result);
        setSubmitting(false);
        return result;
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = (values, setSubmitting, resetForm) => {
    setSubmitting(true);
    const upload_timestamp = new Date().toISOString();
    let id = values.subject_of_search + "_" + upload_timestamp;

    // Step 1: Upload original document to S3 for conversion to txt
    uploadDocToS3(id, values.document_content, values.file.type, setSubmitting);

    // resetForm({});
    // Step 2: Upload remaining fields to Dynamo
    // const warrant = {
    //   country: values.country,
    //   creation_year: values.year,
    //   is_template: values.isTemplate ? 1 : 0,
    //   state: values.state,
    //   subject_of_search: values.subject_of_search, // primary key
    //   types_of_crime: values.types_of_crimes,
    //   types_of_data: values.types_of_data,
    //   upload_timestamp: upload_timestamp, // sort key
    //   votes: 0
    // };
    // console.log(uploadMetadataToDynamoDB(warrant));
    // alert(JSON.stringify(warrant, null, 2));
    // resetForm();
  };

  let handleDropBox = (acceptedFiles, values) => {
    //handle the file the dropbox recieves
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // file contents
      const binaryStr = reader.result;
      values.document_content = binaryStr;
      values.file = acceptedFiles[0];
    };

    if (Object.entries(acceptedFiles).length === 0) {
      values.document_content = "";
    } else {
      console.log(acceptedFiles);
      reader.readAsArrayBuffer(acceptedFiles[0]);
    }
  };

  return (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        // initialValues={{}}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Upload Box */}
            <HorizontalGridContainer>
              <SubTitle>
                <div>
                  <p>1</p>
                </div>
                <h2>
                  Upload Document <Required>*required</Required>
                </h2>
              </SubTitle>
              <DragDropBox documentHandler={e => handleDropBox(e, values)} />
              {errors.document_content && touched.document_content && (
                <div
                  style={{
                    marginLeft: "80px",
                    color: "red",
                    marginTop: ".5rem"
                  }}
                >
                  {errors.document_content}
                </div>
              )}
            </HorizontalGridContainer>
            {/* Upload Box */}

            <Submit type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Submit>
          </form>
        )}
      </Formik>
    </div>
  );
};

// --- STYLE ---
const HorizontalGridContainer = styled.div`
  display: block;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  margin-top: 8px;
  & div {
    display: table;
    background: #e1ecff;
    color: #7b7e83;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px 10px 10px 0;
    & p {
      display: table-cell;
      margin: 0;
      text-align: center;
      vertical-align: middle;
      color: rgb(92, 92, 92);
      font-family: Helvetica, sans-serif;
      font-size: 16px;
      font-weight: 700;
    }
  }
  & h2 {
    display: inline-block;
    font-family: ".SFNSText", "SFProText-Regular", "SFUIText-Regular",
      ".SFUIText", sans-serif;
    color: rgb(0, 0, 0);
    font-size: 24px;
    font-weight: 100;
    margin: 0;
  }
`;

const Required = styled.span`
  color: #e41355;
  font-size: 12px;
`;

const Submit = styled.button`
  display: block;
  cursor: pointer;
  border: none;
  position: relative;
  top: 0px;
  background: linear-gradient(
    53deg,
    var(--token-147ad8ce-09dc-4290-9ac9-07d8d4f9211f, rgb(89, 183, 177)) 0%,
    hsl(218, 100%, 87%) 100%
  );
  border-radius: 31px;
  width: 229px;
  height: 61px;
  font-weight: bold;
  font-family: ".SFNSText", "SFProText-Regular", "SFUIText-Regular", ".SFUIText",
    sans-serif;
  color: white;
  font-size: 24px;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 10px;
  transition: 0.1s;
  &:focus {
    outline: 0;
    box-shadow: 0px 0px 0px 5px rgb(157, 252, 255);
  }
`;

export default Basic;
