import React from "react";
import { Form, Button } from "formik-semantic-ui";
import * as Yup from "yup";
import { Header, Container } from "semantic-ui-react";
import { firebase } from "../../config/firebase";

const ValidationSchema = Yup.object().shape({
  password: Yup.string().required("Pflichtfeld!"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwörter nicht sind identisch")
    .required("Pflichtfeld")
});

const ChangePasswordForm = () => {
  const onSubmit = (values, formikApi) => {
    firebase
      .auth()
      .currentUser.updatePassword(values.password)
      .then(function() {
        formikApi.setSubmitting(false);
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  return (
    <Container style={{ marginBottom: "5em " }}>
      <Header dividing as="h3" color="blue">
        Passwort ändern
      </Header>

      <Form
        onSubmit={onSubmit}
        validationSchema={ValidationSchema}
        schema={{
          password: {
            label: "Password",
            type: "password"
          },
          passwordConfirm: {
            label: "Passwort bestätigen",
            type: "password"
          }
        }}
      >
        <Button.Submit floated="right">Speichern</Button.Submit>
      </Form>
    </Container>
  );
};

export default ChangePasswordForm;
