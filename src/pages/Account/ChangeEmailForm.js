import React from "react";
import { Form, Button } from "formik-semantic-ui";
import * as Yup from "yup";
import { Header, Container, Grid, Segment } from "semantic-ui-react";
import { firebase } from "../../config/firebase";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Pflichtfeld!")
});

const ChangeEmailForm = () => {
  const onSubmit = (values, formikApi) => {
    firebase
      .auth()
      .currentUser.updateEmail(values.email)
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
        Email ändern
      </Header>
      <Form
        initialValues={{ email: firebase.auth().currentUser.email }}
        onSubmit={onSubmit}
        validationSchema={ValidationSchema}
        schema={{
          email: {
            label: "Email",
            type: "email"
          }
        }}
      >
        <Button.Submit floated="right">Speichern</Button.Submit>
      </Form>
    </Container>
  );
};

export default ChangeEmailForm;
