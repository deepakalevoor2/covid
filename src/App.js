import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Header from "./components/header/Header";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { GlobalStyle } from "./global.styles";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import Home from "./pages/home/home";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));

const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route
              exact
              path="/"
              render={() => (currentUser ? <HomePage /> : <Home />)}
            />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
            <div
              render={() =>
                currentUser ? (
                  <div class="left">
                    <div
                      class="ui visible sidebar inverted vertical menu"
                      style={{ top: 90 }}
                    >
                      <a class="item">Insights</a>
                      <a class="item">Entry</a>
                      <a class="item">Patient Status</a>
                      <a class="item">Exit</a>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )
              }
            ></div>
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  /*collectionsArray : selectCollectionsForPreview*/
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
