import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import {
  landing as landingRoutes,
  auth as authRoutes,
  hub as hubRoutes,
  intro as introRoutes
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import WalkthroughLayout from "../layouts/Walkthrough"
import LandingLayout from "../layouts/Landing";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";

import Auth from "../auth"
import ScrollToTop from "../components/ScrollToTop";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props =>
            path == '/' || path == '/auth/sign-in' || path == '/auth/sign-up'
            || path == '/auth/:team/sign-in/:invitation' || path == '/auth/:team/sign-up/:invitation'
             ? (
              <Layout {...props}>
                <Component {...props} />
              </Layout>
            ) : (
                Auth.isUserAuthenticated() ? (
                  <Layout>
                    <Component {...props} />
                  </Layout>
                ) : (
                <Redirect to="/auth/sign-in" />
              )
            )

          }
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props =>
          path == '/' || path == '/auth/sign-in' || path == '/auth/sign-up'
          || path == '/auth/:team/sign-in/:invitation' || path == 'auth/:team/sign-up/:invitation'
           ? (
            <Layout>
              <Component {...props} />
            </Layout>
          ) : (
              Auth.isUserAuthenticated() ? (
                <Layout>
                  <Component {...props} />
                </Layout>
              ) : (
                <Redirect to="/auth/sign-in" />
            )
          )
        }
      />
    )
  );

const Routes = () => (
  <Router>
    <ScrollToTop>
      <Switch>
        {childRoutes(LandingLayout, landingRoutes)}
        {childRoutes(AuthLayout, authRoutes)}
        {childRoutes(WalkthroughLayout,introRoutes)}
        {childRoutes(DashboardLayout,hubRoutes)}
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </ScrollToTop>
  </Router>
);

const mapStateToProps = (state, props) => ({
  user: state.user,
  logged_in: state.user.logged_in
})

export default connect(
  mapStateToProps,
  null
)(Routes);
