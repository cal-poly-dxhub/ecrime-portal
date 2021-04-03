import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from './api/Auth';
import SVGIcon from './assets/icons/SVGIcon';
import './notification.css';
import Routes, {
  HELP_ROUTE,
  LOGIN_ROUTE,
  SEARCH_WARRANT_MODERATOR_ROUTE,
  SEARCH_WARRANT_ROUTE,
  SUBJECTS_OF_SEARCH_ROUTE
} from './Routes';
import { UserContext } from './Usercontext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null,
      displayName: ''
    };
  }

  async componentDidMount() {
    try {
      let userObj = await Auth.currentSession();
      if (userObj) {
        let user = {};
        try {
          const idToken = userObj.idToken;
          user.userGroup = idToken.payload['cognito:groups'][0]; //NOTE: this could cause an error if a user is in multiple groups
          user.fullName = idToken.payload.name;
          user.email = idToken.payload.email;
        } catch (error) {}

        this.setState({ displayName: this.extractUsername(user.fullName) });
        this.userHasAuthenticated(true, user);
      }
    } catch (e) {
      if (e !== 'No current user') {
        this.setState({ displayName: '' });
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = (authenticated, user) => {
    if (authenticated) {
      this.setState({ user: user });
      this.setState({ isAuthenticated: authenticated });
      this.setState({ displayName: this.extractUsername(user.fullName) });
    }
  };

  handleLogout = async event => {
    logout();
    this.userHasAuthenticated(false);
    this.props.history.push(LOGIN_ROUTE);
    window.location.reload(false);
  };

  extractUsername = fullName => {
    return fullName.split('@')[0];
  };

  showNotifications = () => {
    store.addNotification({
      type: 'info',
      content: <Notification>Uploaded successfully!</Notification>,
      width: 300,
      insert: 'top',
      container: 'top-center',
      animationIn: ['notificationAnim', 'fadeIn'],
      animationOut: ['notificationAnim', 'fadeOut'],
      dismiss: {
        duration: 3000
      }
    });
  };

  render() {
    //Triggers notification to showup on screen

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      user: this.state.user,
      showNotifications: this.showNotifications
    };

    const AuthenticatedAppBarOptions = () => (
      <NavItems>
        <li>
          <a href={SUBJECTS_OF_SEARCH_ROUTE}>Subjects of Search</a>
        </li>
        <li>
          <a href={SEARCH_WARRANT_ROUTE}>Search Warrants</a>
        </li>
        {this.state.user !== null &&
        this.state.user.userGroup === 'Moderator' ? (
          <li>
            <a href={SEARCH_WARRANT_MODERATOR_ROUTE}>Moderate</a>
          </li>
        ) : null}
        <li>
          <a href={HELP_ROUTE}>Help</a>
        </li>
        <NavProfile>
          <SVGIcon name={'Profile'} style={ProfileIcon} color="#24252a" />
          {this.state.displayName}
          <SVGIcon name={'ExpandTriangle'} style={ExpandIcon} color="#24252a" />
          <div>
            <li onClick={this.handleLogout}>Log Out</li>
          </div>
        </NavProfile>
      </NavItems>
    );

    const UnauthenticatedAppBarOptions = () => (
      <NavItems>
        <li>
          <a href={LOGIN_ROUTE}>Login</a>
        </li>
      </NavItems>
    );

    return (
      <div>
        <ReactNotification />
        <NavContainer>
          <Nav>
            <NavLogo>
              <a href="/">E-CRIME</a>
            </NavLogo>
            {this.state.isAuthenticated ? (
              <AuthenticatedAppBarOptions />
            ) : (
              <UnauthenticatedAppBarOptions />
            )}
          </Nav>
        </NavContainer>
        <AppContainer>
          {/* styling for nav bar */}
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossOrigin="anonymous"
          />

          <UserContext.Provider value={childProps.user}>
            <Routes childProps={childProps} />
          </UserContext.Provider>
        </AppContainer>
      </div>
    );
  }
}

export default withRouter(App);

// STYLING

const AppContainer = styled.div`
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
`;

const NavContainer = styled.div`
  top: 0;
  background: #ffffff;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const Nav = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
`;

const NavLogo = styled.div`
  flex: none;

  & a {
    color: #000000;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
  }
  & a:hover {
    color: #000000;
    text-decoration: none;
  }
`;

const NavItems = styled.div`
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  align-items: center;

  & li {
    margin-right: 14px;
    cursor: pointer;
  }

  & a {
    color: #24252a;
  }
  & a:hover {
    color: #63bbb6;
    text-decoration: none;
  }
`;

const NavProfile = styled.button`
  color: #24252a;
  font-size: 14px;
  display: flex;
  padding: 0;
  border: 0;
  background: none;
  margin-left: 25px;
  align-items: center;
  cursor: pointer;

  & svg {
    position: relative;
  }

  &:focus {
    outline: 0;
    & div {
      display: block;
      position: absolute;
      width: 111px;
      text-align: left;
      background: white;
      margin-left: 0px;
      box-shadow: 0px 2px 6px -5px #000000;
      top: 38px;
      padding: 4px;
      font-family: sans-serif;
      font-size: 12px;
      font-weight: 500;
    }
    & div:hover {
      color: #63bbb6;
    }
  }

  & div {
    display: none;
  }
`;

const Notification = styled.div`
  background: #59b7b1;
  color: white;
  font-size: 15px;
  padding: 12px 8px;
  width: 100%;
`;

const ProfileIcon = {
  width: 12,
  fill: '#24252a',
  right: 5,
  cursor: 'auto'
};

const ExpandIcon = {
  width: 6,
  fill: '#24252a',
  left: 12
};
