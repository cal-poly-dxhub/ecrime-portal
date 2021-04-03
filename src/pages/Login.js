// TODO: this entire page needs to be refactored

import React, { Component } from 'react';
import { Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import './Login.css';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SEARCH_WARRANT_ROUTE } from '../Routes';

const Title = styled.h1`
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
  padding-bottom: 30;
`;

const ErrorMessage = styled.p`
  text-align: center;
  padding-top: 15px;
  color: red;
`;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewUser: false,
      email: '',
      password: '',
      newPassword: '',
      name: '',
      user: null,
      isInvalid: false,
      errorMessage: null
    };
  }

  confirmNewUser = async (name, password) => {
    this.setState({ isLoading: true });
    Auth.completeNewPassword(
      this.state.user, // the Cognito User Object
      password,
      { name: name }
    )
      .then(user => {
        // at this time the user is logged in if no MFA required
        console.log('successfully confirmed user:');
        console.log(user);
        this.setState({
          isNewUser: false,
          isLoading: false
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  handleSubmit = async (email, password, actions) => {
    this.setState({ isLoading: true, isInvalid: false });
    actions.setSubmitting(false);
    Auth.signIn(email, password)
      .then(user => {
        if (
          user.challengeName === 'NEW_PASSWORD_REQUIRED' &&
          this.state.isNewUser === false
        ) {
          // UNCONFIRMED USER
          console.log('a new user is trying to sign in');
          this.setState({
            isNewUser: true,
            isLoading: false,
            user: user
          });
        } else {
          // CONFIRMED USER
          let thisUser = { userGroup: null, fullName: null, email: null };
          try {
            // thisUser.grou =
            //   user.signInUserSession.idToken.payload["cognito:groups"][0];

            thisUser.userGroup =
              user.signInUserSession.idToken.payload['cognito:groups'][0]; //NOTE: this could cause an error if a user is in multiple groups
            thisUser.fullName = user.signInUserSession.idToken.payload.name;
            thisUser.email = user.signInUserSession.idToken.payload.email;
          } catch (error) {
            thisUser = null;
          }

          actions.setSubmitting(false);
          this.props.userHasAuthenticated(true, thisUser);
          this.props.history.push(SEARCH_WARRANT_ROUTE);
          console.log(thisUser);
          console.log('successfully signed in an old user');
        }
      })
      .catch(e => {
        // smth went wrong
        this.setState({
          isInvalid: true,
          errorMessage: e.message,
          isLoading: false
        });
        actions.setSubmitting(false);
        console.log(e);
      });
  };

  render() {
    // --- Standard Auth Flow ---
    const schema = Yup.object({
      email: Yup.string().email().required('Required'),
      password: Yup.string()
        .required('Required')
        .min(8)
        .matches(/[a-z]/, 'at least one lowercase char')
        .matches(/[A-Z]/, 'at least one uppercase char')
        .matches(/\d{1}/, 'at least 1 number')
    });

    // --- New User Auth Flow ---
    const schema2 = Yup.object({
      name: Yup.string().required('Required'),
      password: Yup.string()
        .required('Required')
        .min(8)
        .matches(/[a-z]/, 'at least one lowercase char')
        .matches(/[A-Z]/, 'at least one uppercase char')
        .matches(/\d{1}/, 'at least 1 number')
    });

    return (
      <div className="Login">
        {this.state.isNewUser ? (
          // --- New User Auth Flow ---
          <div>
            <Title>Welcome!</Title>
            <Description>
              Since this is your first time signing in, <br />
              let's secure a few more details before getting started.
            </Description>
            <Formik
              validationSchema={schema2}
              onSubmit={values => {
                this.confirmNewUser(values.name, values.password);
              }}
              initialValues={{ name: '', password: '' }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                isValid,
                errors,
                dirty
              }) => (
                <form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      autoFocus
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={errors.name}
                      onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <FormGroup>
                    <FormLabel>New Password</FormLabel>
                    <FormControl
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={errors.password}
                      onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </FormGroup>
                  <LoaderButton
                    block
                    bssize="large"
                    disabled={!dirty || !isValid}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Confirm Account"
                    loadingText="Confirming Account..."
                  />
                </form>
              )}
            </Formik>
          </div>
        ) : (
          // --- Standard Auth Flow ---
          <div>
            <Formik
              validationSchema={schema}
              onSubmit={(values, actions) => {
                this.handleSubmit(values.email, values.password, actions);
              }}
              initialValues={{ email: '', password: '' }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                isValid,
                dirty,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                  <FormGroup controlId="email" bssize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                      autoFocus
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <FormGroup controlId="password" bssize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <LoaderButton
                    block
                    bssize="large"
                    disabled={!dirty || !isValid}
                    type="submit"
                    isLoading={isSubmitting}
                    text="Login"
                    loadingText="Logging in…"
                  />
                </form>
              )}
            </Formik>
            {this.state.isInvalid ? (
              <Fade>
                <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
              </Fade>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}
