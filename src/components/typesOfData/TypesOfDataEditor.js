import React from "react";
import styled from "styled-components";
import { withFormik } from "formik";
import * as Yup from "yup";

import SVGIcon from "../../assets/icons/SVGIcon";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    typeOfData: Yup.string()
      .min(3, "too short")
      .required("Please insert a valid type of data")
  }),
  mapPropsToValues: props => ({
    typeOfData: props.currentDataType
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    let uploaded = props.updateFunction(values.typeOfData);
    setSubmitting(false);
    if (uploaded) {
      props.showNotifications();
      props.setDataTypeValue(values.typeOfData);
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
      {/* Type Of Data Textbox */}
      <HorizontalGridContainer>
        <HorizontalGridChild width={"100%"}>
          <TextBoxContainer>
            <TextBox
              id="typeOfData"
              placeholder="What do you want to change the data type to?"
              type="typeOfData"
              value={values.typeOfData}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.typeOfData && touched.typeOfData && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.typeOfData}
              </div>
            )}
          </TextBoxContainer>
        </HorizontalGridChild>
        <HorizontalGridChild />
      </HorizontalGridContainer>
      {/* Type Of Data Textbox */}

      <Submit type="submit" disabled={isSubmitting}>
        Submit
      </Submit>
    </form>
  );
};
const MyEnhancedForm = formikEnhancer(MyForm);

/**
 * Warrant Uploader
 *
 * @param {function} closeButton
 */
const TypeOfDataEditor = props => {
  return (
    <MainContainer>
      <SubContainer>
        <Wrapper>
          <Close onClick={props.close}>
            <SVGIcon name={"Exit"} style={CloseIcon} />
          </Close>

          <Title>Edit Type of Data</Title>

          <MyEnhancedForm {...props} />
        </Wrapper>
      </SubContainer>
    </MainContainer>
  );
};

export default TypeOfDataEditor;

//Styles

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
  max-height: 325px;
  margin: auto;
  display: flex;
  overflow: auto;
  padding: 10px;
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

const TextBoxContainer = styled.div`
  margin: 20px;
  font-family: sans-serif;
  font-size: 15px;
  color: #989898;
  text-align: center;
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
  padding: 20px;
  width: 500px;
  text-align: center;
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
`;
