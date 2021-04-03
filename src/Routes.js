import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import CompanyDemo from './pages/CompanyDemo';
import CompanyPage from './pages/CompanyPage';
import Help from './pages/Help';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SWDemo from './pages/SWDemo';
import SWModerator from './pages/SWModerator';

export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const SUBJECTS_OF_SEARCH_ROUTE = '/subjectsofsearch';
export const SUBJECT_OF_SEARCH_ROUTE = '/subjectofsearch/';
export const SEARCH_WARRANT_ROUTE = '/searchwarrants';
export const SEARCH_WARRANT_MODERATOR_ROUTE = '/moderator';
export const HELP_ROUTE = '/help';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path={HOME_ROUTE} exact component={Home} props={childProps} />
    <AppliedRoute
      path={LOGIN_ROUTE}
      exact
      component={Login}
      props={childProps}
    />
    <AppliedRoute
      path={SEARCH_WARRANT_ROUTE}
      exact
      component={SWDemo}
      props={childProps}
    />
    <AppliedRoute
      path={SUBJECTS_OF_SEARCH_ROUTE}
      exact
      component={CompanyDemo}
      props={childProps}
    />
    <AppliedRoute
      path={`${SUBJECT_OF_SEARCH_ROUTE}:id`}
      component={CompanyPage}
      props={childProps}
    />
    <AppliedRoute
      path={SEARCH_WARRANT_MODERATOR_ROUTE}
      exact
      component={SWModerator}
      props={childProps}
    />
    <AppliedRoute path={HELP_ROUTE} exact component={Help} props={childProps} />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
