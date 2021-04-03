import React, { useState } from 'react';
import styled from 'styled-components';
import { version } from '../../package.json';
import { createFeedback } from '../api/Feedback';
import GreyButton from '../components/greyButton';

const Help = props => {
  const [feedback, setFeedback] = useState('');

  const submitFeedback = () => {
    createFeedback({
      content: feedback,
      user: props.user.email,
      version: version
    });
    setFeedback('');
    props.showNotifications();
  };

  return (
    <Wrapper>
      <Container>
        <h2>Submit Feedback</h2>
        <Input
          placeholder={'Tell us about a problem or feature you want to see...'}
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
        />
        <GreyButton
          style={{ float: 'right' }}
          buttonText="Submit"
          onClick={() => submitFeedback()}
        />
        <p>Version Number: {version}</p>
      </Container>
    </Wrapper>
  );
};

export default Help;

const Wrapper = styled.div`
  width: 100%
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Container = styled.div`
  width: 75%;
`;

const Input = styled.textarea`
  width: 100%;
  height: 100px;
`;
