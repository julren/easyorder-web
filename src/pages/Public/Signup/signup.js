import React from "react";
import { Header } from "semantic-ui-react";
import { Form, Button } from "formik-semantic-ui";
import * as Yup from "yup";
import AuthLayout from "../hoc/authLayout";
const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
  password: Yup.string().required("Pflichtfeld"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwörter sind nicht identisch!")
    .required("Pflichtfeld")
});

const handleSubmit = (vaules, formikApi) => {
  console.log("values", vaules);
  setTimeout(() => {
    formikApi.setSubmitting(false);
  }, 2000);
};

const SignUp = props => {
  return (
    <AuthLayout>
      <Header as="h1">Registrieren</Header>

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
    </AuthLayout>
  );
};

export default SignUp;
