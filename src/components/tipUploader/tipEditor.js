import React from "react";
import styled from "styled-components";
import { withFormik } from "formik";
import * as Yup from "yup";

import SVGIcon from "../../assets/icons/SVGIcon";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    headline: Yup.string()
      .min(2, "too short")
      .required("Please including a headline"),
    body: Yup.string()
      .min(100, "Minimum is 100 characters")
      .required("Please including a body"),
    source: Yup.string()
      .min(2, "Invalid")
      .required("Please list your source")
  }),
  mapPropsToValues: props => ({
    headline: props.currentHeadline,
    body: props.currentDetails,
    source: props.currentSource
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    let uploaded = props.updateFunction(
      values.headline,
      values.body,
      values.source
    );
    setSubmitting(false);
    if (uploaded) {
      props.showNotifications();
      props.setHeadline(values.headline);
      props.setBody(values.body);
      props.setSource(values.source);
      props.close();
    }
  },
  displayName: "MyForm"
});

const MyForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      {/* Headline Textbox */}
      <HorizontalGridContainer>
        <HorizontalGridChild width={"350px"}>
          <SubTitle>
            <div>
              <p>1</p>
            </div>
            <h2>
              Headline <Required>*required</Required>
            </h2>
          </SubTitle>
          <TextBoxContainer>
            <TextBox
              id="headline"
              placeholder="What's most important to know?"
              type="headline"
              value={values.headline}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.headline && touched.headline && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.headline}
              </div>
            )}
          </TextBoxContainer>
        </HorizontalGridChild>
        <HorizontalGridChild />
      </HorizontalGridContainer>
      {/* Headline Textbox */}

      {/* Details Textbox */}
      <HorizontalGridContainer>
        <HorizontalGridChild width={"95%"}>
          <SubTitle>
            <div>
              <p>2</p>
            </div>
            <h2>
              Details <Required>*required</Required>
            </h2>
          </SubTitle>
          <TextBoxContainer>
            <TextArea
              id="body"
              placeholder="Share your experience"
              type="body"
              value={values.body}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.body && touched.body && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.body}
              </div>
            )}
          </TextBoxContainer>
        </HorizontalGridChild>
        <HorizontalGridChild />
      </HorizontalGridContainer>
      {/* Details Textbox */}

      {/* Source Textbox */}
      <HorizontalGridContainer>
        <HorizontalGridChild width={"350px"}>
          <SubTitle>
            <div>
              <p>3</p>
            </div>
            <h2>
              Source <Required>*required</Required>
            </h2>
          </SubTitle>
          <TextBoxContainer>
            <TextBox
              id="source"
              placeholder="e.g. IACP Technology Conference"
              type="source"
              value={values.source}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.source && touched.source && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.source}
              </div>
            )}
          </TextBoxContainer>
        </HorizontalGridChild>
        <HorizontalGridChild />
      </HorizontalGridContainer>
      {/* Source Textbox */}

      <Submit type="submit" disabled={isSubmitting}>
        Submit
      </Submit>
    </form>
  );
};
const MyEnhancedForm = formikEnhancer(MyForm);

/**
 * Tip Uploader
 *
 * @param {function} closeButton
 * @param {function} subjectId
 */
const TipEditor = props => {
  console.log(props);
  return (
    <MainContainer>
      <SubContainer>
        <Wrapper>
          <Close onClick={props.close}>
            <SVGIcon name={"Exit"} style={CloseIcon} />
          </Close>

          <Title>Edit Warrant Tip</Title>

          <MyEnhancedForm {...props} />
        </Wrapper>
      </SubContainer>
    </MainContainer>
  );
};

export default TipEditor;

// --- Styling ---
const CloseIcon = {
  width: 20,
  fill: "#59b7b1"
};

const MainContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
  margin: 0px;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
`;

const SubContainer = styled.div`
  background: white;
  width: 970px;
  height: 95%;
  max-height: 820px;
  margin: auto;
  display: flex;
  overflow: auto;
`;

const Wrapper = styled.div`
  height: 96%;
  width: 95%;
  margin: auto;
`;

const Close = styled.div`
  float: right;
  cursor: pointer;
`;

const Title = styled.h1`
  color: black;
  font-family: ".SFNSText", "SFProText-Regular", "SFUIText-Regular", ".SFUIText",
    sans-serif;
  -webkit-text-fill-color: rgb(0, 0, 0);
  font-size: 30px;
  font-weight: bold;
  margin-top: 0;
  clear: right;
  margin-left: 40px;
  margin-bottom: 15px;
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

const TextBoxContainer = styled.div`
  margin: 20px;
  margin-left: 80px;
  font-family: sans-serif;
  font-size: 15px;
  color: #989898;
`;

const TextBox = styled.input.attrs({ type: "text" })`
  background-color: transparent;
  font-family: sans-serif;
  font-size: 18px;
  outline: none;
  border: 0;
  border-radius: 0px;
  border-bottom: 2px solid #aaa;
  -o-transition: box-shadow 0.5s ease;
  -moz-transition: box-shadow 0.5s ease;
  -webkit-transition: box-shadow 0.5s ease;
  -ms-transition: box-shadow 0.5s ease;
  transition: box-shadow 0.5s ease;
  box-shadow: 0 0 0 0 #ddd inset;
  padding: 5px;
  width: 360px;
`;

const TextArea = styled.textarea`
  background-color: transparent;
  width: 100%;
  height: 200px;
  font-family: sans-serif;
  font-size: 18px;
  outline: none;
  border-radius: 0px;
  border: 2px solid #aaa;
  -o-transition: box-shadow 0.5s ease;
  -moz-transition: box-shadow 0.5s ease;
  -webkit-transition: box-shadow 0.5s ease;
  -ms-transition: box-shadow 0.5s ease;
  transition: box-shadow 0.5s ease;
  box-shadow: 0 0 0 0 #ddd inset;
  padding: 5px;
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

const HorizontalGridContainer = styled.div`
  display: block;
`;

const HorizontalGridChild = styled.div`
  display: inline-block;
  width: ${props => props.width};
  & input {
    width: ${props => props.width};
    text-align: ${props => props.align};
  }
`;

const Required = styled.span`
  color: #e41355;
  font-size: 12px;
`;
