// import React from "react";
// import { Route, Switch, Redirect } from "react-router-dom";

// import Spinner from "./components/spinner/spinner.component";
// import ErrorBoundary from "./components/error-boundary/error-boundary.component";

// const Header = () => {
//   return (
//     <div className="ui secondary pointing menu">
//       <Suspense fallback={<Spinner />}>
//         <Route to="/" className="item">
//           Logo
//         </Route>
//         <div className="right menu">
//           <Route
//             exact
//             path="/signin"
//             render={() =>
//               currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
//             }
//           />
//         </div>
//         <div class="left">
//           <div
//             class="ui visible sidebar inverted vertical menu"
//             style={{ top: 40 }}
//           >
//             <a class="item">Insights</a>
//             <a class="item">Entry</a>
//             <a class="item">Patient Status</a>
//             <a class="item">Exit</a>
//           </div>
//         </div>
//       </Suspense>
//     </div>
//   );
// };

import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

//import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
//import { signOutStart } from "../../redux/user/user.actions";
import { isAuthenticated, signout } from "../../apis";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

const Header = () => {
  const performRedirect = () => {
    return <Redirect to="/" />;
  };

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        {isAuthenticated() ? (
          <OptionLink
            to="/#"
            onClick={() => {
              signout(() => {
                performRedirect();
              });
            }}
          >
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
      </OptionsContainer>
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  //hidden: selectCartHidden,
});

// const mapDispatchToProps = (dispatch) => ({
//   signOutStart: () => dispatch(signOutStart()),
// });

export default connect(mapStateToProps)(Header);
