import React from "react";
import { Form, Button } from "formik-semantic-ui";
import * as Yup from "yup";
import { Header, Container, Segment } from "semantic-ui-react";
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
    <Segment.Group>
      <Segment color="blue" inverted>
        <Header as="h3">Passwort ändern</Header>
      </Segment>
      <Segment clearing>
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
      </Segment>
    </Segment.Group>
  );
};

export default ChangePasswordForm;
