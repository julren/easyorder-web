import React, { Component } from "react";

import { firebaseRestaurants, firebase } from "../../config/firebase";
import { Header } from "semantic-ui-react";
import { Form, Button, Input, Dropdown } from "formik-semantic-ui";
import * as Yup from "yup";
import FileUpload from "./fileUpload";

import { WEEKDAYS } from "../../utils/globalConstants";
const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
  password: Yup.string().required("Password is required!")
});

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {
        name: "",
        street: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
        openingDay: "",
        openingHour: "",
        closingDay: "",
        closingHour: "",
        photos: "",
        imageURLs: []
      },
      uid: ""
    };
  }

  componentDidMount() {
    this._isMounted = true;
    firebaseRestaurants
      .where("author", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log(
            "Restaurant Doc does not exist for user uid",
            firebase.auth().currentUser.uid
          );
        } else {
          let doc = querySnapshot.docs[0];
          console.log("got data id ", doc.id, doc.data());

          if (this._isMounted) {
            this.setState({ formValues: doc.data(), uid: doc.id });
          }
        }
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = (values, formikApi) => {
    console.log("handleSubmit formValues", values);

    if (this.state.uid) {
      firebaseRestaurants
        .doc(this.state.uid)
        .update(values)
        .then(function(docRef) {
          console.log("updated successfully");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        })
        .finally(() => formikApi.setSubmitting(false));
    } else {
      values.author = firebase.auth().currentUser.uid;

      firebaseRestaurants
        .add(values)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        })
        .finally(() => formikApi.setSubmitting(false));
    }
  };

  render() {
    return (
      <div>
        <h1>Restaurant</h1>

        <Form
          enableReinitialize={true}
          initialValues={this.state.formValues}
          onSubmit={this.handleSubmit}
          // validationSchema={ValidationSchema}
          render={() => (
            <Form.Children>
              <Input label="Name" name="name" />
              <Input label="Straße" name="street" />
              <Form.Group widths="2">
                <Input label="PLZ" name="postcode" />
                <Input label="Ort" name="city" />
              </Form.Group>
              <Form.Group widths="2">
                <Input label="Telefon" name="phone" />
                <Input label="Email" name="email" />
              </Form.Group>
              <Header as="h4">Öffnungszeiten</Header>
              <Form.Group widths="4">
                <Dropdown
                  label="Erster Tag"
                  name="openingDay"
                  options={WEEKDAYS}
                />
                <Input
                  label="Öffnungszeit"
                  name="openingHour"
                  inputProps={{
                    label: { basic: true, content: "Uhr" },
                    labelPosition: "right"
                  }}
                />
                <Dropdown
                  label="Letzter Tag"
                  name="closingDay"
                  options={WEEKDAYS}
                />
                <Input
                  label="Ladenschluss"
                  name="closingHour"
                  inputProps={{
                    label: { basic: true, content: "Uhr" },
                    labelPosition: "right"
                  }}
                />
              </Form.Group>

              {/* <FileUpload name="imageURLs" label="Fotos" /> */}

              <Button.Submit>Speichern</Button.Submit>
            </Form.Children>
          )}
        />
      </div>
    );
  }
}

export default Restaurant;
