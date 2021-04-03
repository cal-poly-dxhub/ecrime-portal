import { withFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { getCrimeList } from '../../api/Crime';
import { getDataTypes } from '../../api/DataType';
import { getSubjectsList } from '../../api/SubjectOfSearch';
import { createUnapprovedWarrant, uploadDocToS3 } from '../../api/Warrant';
import SVGIcon from '../../assets/icons/SVGIcon';
import { UserContext } from '../../Usercontext';
import ChipTextbox from './chipTextBox';
import DragDropBox from './dropzone';

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
  max-height: 960px;
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

const CheckBoxContainer = styled.label`
  display: block;
  font-size: 18px;
  font-family: sans-serif;
  position: relative;
  padding-left: 35px;
  margin-top: 15px;
  margin-left: 92px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  & span {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    margin: -3px;
  }

  &:hover input ~ span {
    background-color: #ccc;
  }

  & input:checked ~ span {
    background-color: #59b7b1;
  }

  & span:after {
    content: '';
    position: absolute;
    display: none;
  }

  & input:checked ~ span:after {
    display: block;
  }

  & span:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
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

  & input {
    width: ${props => props.width};
    text-align: ${props => props.align};
  }
`;

const Required = styled.span`
  color: #e41355;
  font-size: 12px;
`;

// --- Formik: Validation and onSubmit Handler ---
const formikEnhancer = withFormik({
  displayName: 'MyForm',
  validationSchema: Yup.object().shape({
    year: Yup.number()
      .typeError('Invalid Year')
      .min(1800, 'Invalid Year')
      .max(new Date().getFullYear(), 'Invalid Year'),
    state: Yup.string()
      .uppercase()
      .min(2, 'Must equal 2 characters')
      .matches(
        /(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)/,
        'Invalid state'
      ),
    county: Yup.string(),
    isTemplate: Yup.boolean(),
    subjects: Yup.array().min(1, 'Insert at least 1 type of data'),
    types_of_data: Yup.array().min(1, 'Insert at least 1 type of data'),
    types_of_crimes: Yup.array(),
    document_content: Yup.string().required('A pdf/word document is required')
  }),

  mapPropsToValues: ({ props }) => ({
    document_content: '',
    isTemplate: false,
    subjects: [],
    types_of_data: []
  }),

  handleSubmit: async (values, { setSubmitting, props }) => {
    setSubmitting(true);

    const upload_timestamp = new Date().toISOString();
    const uuidv1 = require('uuid/v1');
    const id = uuidv1();
    const warrant = {
      id: id,
      county: values.county,
      creationYear: values.year,
      isTemplate: values.isTemplate ? 1 : 0,
      state: values.state,
      unapprovedWarrantSubjectId: props.subjectId,
      crimes: values.types_of_crimes,
      dataTypes: values.types_of_data,
      votes: 0,
      uploadTimestamp: upload_timestamp
    };

    // subjects {
    //   items {
    //     subject{
    //       id
    //       name
    //     }
    //   }
    //   nextToken
    // }

    let step1 = uploadDocToS3(
      id,
      values.document_content,
      values.file.type
      // setSubmitting(false)
    );
    let step2 = createUnapprovedWarrant(warrant, id, values.subjects);

    if (step1 && step2) {
      props.showNotifications();
      props.refresh(false);
      props.refresh(true);
    }
  }
});

// --- Upload Warrant Form ---

const MyForm = props => {
  const [subjectsList, set_subjectsList] = useState([]);
  const [dataChipsList, set_dataChipsList] = useState([]);
  const [crimeChipsList, set_crimeChipsList] = useState([]);

  let handleDropBox = acceptedFiles => {
    //handle the file the dropbox recieves
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // file contents
      const binaryStr = reader.result;
      values.document_content = binaryStr;
      values.file = acceptedFiles[0];
    };

    if (Object.entries(acceptedFiles).length === 0) {
      values.document_content = '';
    } else {
      console.log(acceptedFiles);
      reader.readAsArrayBuffer(acceptedFiles[0]);
    }
  };

  let getSubjectId = subjectName => {
    let found;
    props.subjects.forEach(function (subject) {
      if (subject['name'] === subjectName) {
        found = subject['id'];
      }
    });
    return found;
  };

  let subjectsChipAdd = chip => {
    let newSubjectsList = [...subjectsList, chip];
    set_subjectsList(newSubjectsList);
    let subjectIdList = newSubjectsList.map(subject => {
      return getSubjectId(subject);
    });
    values.subjects = subjectIdList; //update the subjects list for the JSON output
  };
  let subjectsChipDelete = chip => {
    let newSubjectsList = [...subjectsList];
    const index = newSubjectsList.indexOf(chip);
    newSubjectsList.splice(index, 1);
    set_subjectsList(newSubjectsList);

    let subjectIdList = newSubjectsList.map(subject => {
      return getSubjectId(subject);
    });
    values.subjects = subjectIdList; //update the subjects list for the JSON output
  };

  let dataChipAdd = chip => {
    let newdataChipsList = [...dataChipsList, chip];
    values.types_of_data = newdataChipsList; //update the types_of_data list for the JSON output
    set_dataChipsList(newdataChipsList);
  };
  let dataChipDelete = chip => {
    let newdataChipsList = [...dataChipsList];
    const index = newdataChipsList.indexOf(chip);
    newdataChipsList.splice(index, 1);
    values.types_of_data = newdataChipsList; //update the types_of_data list for the JSON output
    set_dataChipsList(newdataChipsList);
  };

  let crimeChipAdd = chip => {
    let newcrimeChipsList = [...crimeChipsList, chip];
    values.types_of_crimes = newcrimeChipsList; //update the types_of_crime list for the JSON output
    set_crimeChipsList(newcrimeChipsList);
  };
  let crimeChipDelete = chip => {
    let newcrimeChipsList = [...crimeChipsList];
    const index = newcrimeChipsList.indexOf(chip);
    newcrimeChipsList.splice(index, 1);
    values.types_of_crimes = newcrimeChipsList; //update the types_of_crime list for the JSON output
    set_crimeChipsList(newcrimeChipsList);
  };

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }
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
    <form onKeyDown={onKeyDown} onSubmit={handleSubmit}>
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
        <DragDropBox documentHandler={handleDropBox} />
        {errors.document_content && touched.document_content && (
          <div style={{ marginLeft: '80px', color: 'red', marginTop: '.5rem' }}>
            {errors.document_content}
          </div>
        )}
      </HorizontalGridContainer>
      {/* Upload Box */}

      {/* isTemplate Checkbox */}
      <CheckBoxContainer>
        Can this document be used as a template?
        <input
          id="isTemplate"
          type="checkbox"
          value={values.isTemplate}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span />
      </CheckBoxContainer>
      {/* isTemplate Checkbox */}

      {/* Subjects of Search Textbox */}
      <HorizontalGridContainer>
        <HorizontalGridChild width={'250px'}>
          <SubTitle>
            <div>
              <p>2</p>
            </div>
            <h2>
              Subjects Of Search <Required>*required</Required>
            </h2>
          </SubTitle>
          <TextBoxContainer>
            <ChipTextbox
              deleteFunc={subjectsChipDelete}
              addChip={subjectsChipAdd}
              chipsList={subjectsList}
              placeholder={'e.g. Uber'}
              recommendations={props.subjects}
              filter={'name'}
              userInput={false}
            />
            {errors.subjects && touched.subjects && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.subjects}
              </div>
            )}
          </TextBoxContainer>
        </HorizontalGridChild>
      </HorizontalGridContainer>
      {/* Subjects of Search Textbox */}

      {/* Type Of Data Textbox */}
      <HorizontalGridContainer>
        <HorizontalGridChild width={'250px'}>
          <SubTitle>
            <div>
              <p>3</p>
            </div>
            <h2>
              Types Of Data <Required>*required</Required>
            </h2>
          </SubTitle>
          <TextBoxContainer>
            <ChipTextbox
              deleteFunc={dataChipDelete}
              addChip={dataChipAdd}
              chipsList={dataChipsList}
              placeholder={'e.g. location'}
              recommendations={props.dataTypeList}
              filter={'type'}
              userInput={true}
            />
            {errors.types_of_data && touched.types_of_data && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.types_of_data}
              </div>
            )}
          </TextBoxContainer>
        </HorizontalGridChild>
      </HorizontalGridContainer>
      {/* Type Of Data Textbox */}

      {/* Type Of Crimes Textbox */}
      <HorizontalGridContainer>
        <HorizontalGridChild width={'250px'}>
          <SubTitle>
            <div>
              <p>4</p>
            </div>
            <h2>Types Of Crimes</h2>
          </SubTitle>
          <TextBoxContainer>
            <ChipTextbox
              deleteFunc={crimeChipDelete}
              addChip={crimeChipAdd}
              chipsList={crimeChipsList}
              placeholder={'e.g. Theft'}
              recommendations={props.crimeList}
              filter={'name'}
              userInput={true}
            />
          </TextBoxContainer>
        </HorizontalGridChild>
      </HorizontalGridContainer>
      {/* Type Of Crimes Textbox */}

      {/* Date Issued Textbox */}
      <HorizontalGridContainer>
        <HorizontalGridChild width={'100px'} align={'center'}>
          <SubTitle>
            <div>
              <p>5</p>
            </div>
            <h2>Date Issued</h2>
          </SubTitle>
          <TextBoxContainer>
            Year:
            <TextBox
              id="year"
              type="year"
              value={values.year}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="YYYY"
              maxLength="4"
            />
            {errors.year && touched.year && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.year}
              </div>
            )}
          </TextBoxContainer>
        </HorizontalGridChild>
        <HorizontalGridChild width={'80px'} align={'center'}>
          <TextBoxContainer>
            State:
            <TextBox
              id="state"
              type="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="CA"
              maxLength="2"
            />
            {errors.state && touched.state && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>
                {errors.state}
              </div>
            )}
          </TextBoxContainer>
        </HorizontalGridChild>
        <HorizontalGridChild width={'250px'}>
          <TextBoxContainer>
            County:
            <TextBox
              id="county"
              type="county"
              value={values.county}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Los Angeles"
            />
          </TextBoxContainer>
        </HorizontalGridChild>
      </HorizontalGridContainer>
      {/* Date Issued Textbox */}

      <Submit type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Submit>
    </form>
  );
};
const MyEnhancedForm = formikEnhancer(MyForm);

const WarrantUploader = props => {
  const [subjects, setSubjects] = useState([]);
  const [crime, setCrime] = useState([{ name: '' }]);
  const [dataType, setDataType] = useState([{ type: '' }]);
  const [formShowing, setFormShowing] = useState(true);

  const user = useContext(UserContext);

  useEffect(() => {
    getSubjectsList().then(response => setSubjects(response));
    getCrimeList().then(response => setCrime(response));
    getDataTypes().then(response => setDataType(response));
  }, []);

  return (
    <MainContainer>
      <SubContainer>
        <Wrapper>
          <Close onClick={props.closeButton}>
            <SVGIcon name={'Exit'} style={CloseIcon} />
          </Close>

          <Title>Add Search Warrant</Title>

          {formShowing && (
            <MyEnhancedForm
              subjects={subjects}
              crimeList={crime}
              dataTypeList={dataType}
              user={user}
              subjectId={props.subjectId}
              refresh={setFormShowing}
              showNotifications={props.showNotifications}
            />
          )}
        </Wrapper>
      </SubContainer>
    </MainContainer>
  );
};

export default WarrantUploader;
