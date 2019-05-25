import React from "react";
import { Header } from "semantic-ui-react";
import { Form, Button } from "formik-semantic-ui";
import * as Yup from "yup";
import AuthLayout from "../hoc/authLayout";
import { firebase } from "../../../config/firebase";
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
  firebase
    .auth()
    .createUserWithEmailAndPassword(vaules.email, vaules.password)
    .then(value => {
      formikApi.setSubmitting(false);
    })
    .catch(function(error) {});
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
            label: "Password wiederholen",
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
