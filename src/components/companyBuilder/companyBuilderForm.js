import React from 'react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import SVGIcon from '../../assets/icons/SVGIcon';
import { createSubject } from '../../api/SubjectOfSearch';

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().min(2, 'too short').required('company name is required'),
    privacyPolicyUrl: Yup.string()
      .url()
      .required('privacy policy url is required')
  }),
  mapPropsToValues: ({ user }) => ({
    ...user
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    let uploaded = createSubject(values);
    if (uploaded) {
      props.showNotifications();
      props.close();
    }
  },

  displayName: 'MyForm'
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
      {/* company name Textbox */}
      <HorizontalGridContainer>
        <HorizontalGridChild width={'350px'}>
          <SubTitle>
            <div>
              <p>1</p>
            </div>
            <h2>Company Name</h2>
          </SubTitle>
          <TextBoxContainer>
            <TextBox
              id="name"
              placeholder="Uber"
              type="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.name}
              </div>
            )}
          </TextBoxContainer>
        </HorizontalGridChild>
        <HorizontalGridChild />
      </HorizontalGridContainer>
      {/* company name Textbox */}

      {/* url Textbox */}
      <HorizontalGridContainer>
        <HorizontalGridChild width={'350px'}>
          <SubTitle>
            <div>
              <p>2</p>
            </div>
            <h2>Privacy Policy URL</h2>
          </SubTitle>
          <TextBoxContainer>
            <TextBox
              id="privacyPolicyUrl"
              placeholder="https://privacy.uber.com/policy/"
              type="privacyPolicyUrl"
              value={values.privacyPolicyUrl}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.privacyPolicyUrl && touched.privacyPolicyUrl && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.privacyPolicyUrl}
              </div>
            )}
          </TextBoxContainer>
        </HorizontalGridChild>
        <HorizontalGridChild />
      </HorizontalGridContainer>
      {/* url Textbox */}

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
const CompanyBuilderForm = props => {
  return (
    <MainContainer>
      <SubContainer>
        <Wrapper>
          <Close onClick={props.closeButton}>
            <SVGIcon name={'Exit'} style={CloseIcon} color="#59b7b1" />
          </Close>

          <Title>Create a Company Page</Title>

          <MyEnhancedForm
            user={{
              name: '',
              privacyPolicyUrl: ''
            }}
            close={props.closeButton}
            showNotifications={props.showNotifications}
          />
        </Wrapper>
      </SubContainer>
    </MainContainer>
  );
};

export default CompanyBuilderForm;

// --- Styling ---

const CloseIcon = {
  width: 20,
  fill: '#59b7b1'
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
  max-height: 535px;
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
  font-family: '.SFNSText', 'SFProText-Regular', 'SFUIText-Regular', '.SFUIText',
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
    font-family: '.SFNSText', 'SFProText-Regular', 'SFUIText-Regular',
      '.SFUIText', sans-serif;
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

const TextBox = styled.input.attrs({ type: 'text' })`
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
  font-family: '.SFNSText', 'SFProText-Regular', 'SFUIText-Regular', '.SFUIText',
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
