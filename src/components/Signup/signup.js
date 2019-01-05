import React, { Component } from "react";
import { Form, Field, Button } from "formik-semantic-ui";
import * as Yup from "yup";
import ShowPropsInUI from "../../utils/ShowPropsInUI";
const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
  password: Yup.string().required("Password is required!"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required")
});

const handleSubmit = (vaules, formikApi) => {
  console.log("values", vaules);
  setTimeout(() => {
    formikApi.setSubmitting(false);
  }, 2000);
};

const SignUp = props => {
  return (
    <div>
      <h1>Signup</h1>

      <Form
        onSubmit={handleSubmit}
        validationSchema={ValidationSchema}
        schema={{
          email: {
            label: "Email",
            type: "text"
          },
          password: {
            label: "Password",
            type: "password"
          },
          passwordConfirm: {
            label: "Confirm Password",
            type: "password"
          }
        }}
      >
        <Button.Submit>Registrieren</Button.Submit>
      </Form>
    </div>
  );
};

export default SignUp;
