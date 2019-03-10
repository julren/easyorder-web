import React from "react";
import { Form, Button } from "formik-semantic-ui";
import * as Yup from "yup";
import { firebase } from "../../../../config/firebase";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
  password: Yup.string().required("Password is required!")
});

const signIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.

      console.log(error.message);
      // ...
    });
};

const handleSubmit = (vaules, formikApi) => {
  //   db
  //     .collection("users")
  //     .add(vaules)
  //     .then(function(docRef) {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch(function(error) {
  //       console.error("Error adding document: ", error);
  //     });

  console.log("values", vaules);
  signIn(vaules.email, vaules.password);

  setTimeout(() => {
    formikApi.setSubmitting(false);
  }, 2000);
};

const LoginForm = () => {
  return (
    <div>
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
          }
        }}
      >
        <Button.Submit>LogIn</Button.Submit>
      </Form>
    </div>
  );
};

export default LoginForm;
