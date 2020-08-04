import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

//import { signUpStart } from "../../redux/user/user.actions";

import { SignUpContainer, SignUpTitle } from "./sign-up.styles";
import { signup, authenticate, isAuthenticated } from "../../apis";

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "deepak",
    email: "deepualevoor@gmail.com",
    password: "saregama123",
    confirmPassword: "saregama123",
    error: "",
    success: false,
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  // const [values, setValues] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   error: "",
  //   success: false,
  // });

  //const { name, email, password, error, success } = values;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    //signUpStart({ displayName, email, password });
    signup({ displayName, email, password })
      .then((data) => {
        if (data.error) {
          setUserCredentials({
            ...userCredentials,
            error: data.error,
            success: false,
          });
        } else {
          setUserCredentials({
            ...userCredentials,
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const handleChange = (name) => (event) => {
    //const { displayName, value } = event.target;
    setUserCredentials({
      ...userCredentials,
      error: false,
      [name]: event.target.value,
    });

    //setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignUpContainer>
      <SignUpTitle>I do not have a account</SignUpTitle>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange("displayName")}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange("email")}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange("password")}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange("confirmPassword")}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </SignUpContainer>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
// });

// export default connect(null, mapDispatchToProps)(SignUp);
export default SignUp;