import React, { Component } from "react";

import { firebaseRestaurants, firebase } from "../../config/firebase";
import {
  Header,
  Card,
  Segment,
  Container,
  Table,
  Divider,
  Image
} from "semantic-ui-react";
import { Form, Button, Input, Dropdown, TextArea } from "formik-semantic-ui";
import * as Yup from "yup";
import FileUpload from "../FormHelper/fileUpload";
import ShowPropsInUI from "../../utils/ShowPropsInUI";
import { WEEKDAYS, PRICECLASSES } from "../../utils/globalConstants";
import { Field, FieldArray } from "formik";
import { storage } from "../../config/firebase";
import BusinessHoursSegment from "./RestaurantForm/businessHoursSegment";
import AboutRestaurantSegment from "./RestaurantForm/aboutRestaurantSegment";
import MediaSegment from "./RestaurantForm/mediaSegment";
import ContactSegment from "./RestaurantForm/contactSegment";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Pflichtfeld"),
  desc: Yup.string().required("Pflichtfeld"),
  cuisine: Yup.string().required("Pflichtfeld"),
  priceClass: Yup.string().required("Pflichtfeld"),
  adress: Yup.object().shape({
    street: Yup.string().required("Pflichtfeld"),
    postcode: Yup.string().required("Pflichtfeld"),
    city: Yup.string().required("Pflichtfeld")
  }),
  contactInfo: Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Pflichtfeld"),
    phone: Yup.string().required("Pflichtfeld")
  }),
  businessHours: Yup.object().shape({
    day: Yup.string().required("Pflichtfeld"),
    openingHour: Yup.string()
      .matches(/([01]?[0-9]|2[0-3]):[0-5][0-9]/)
      .required("Pflichtfeld"),
    closingHour: Yup.string()
      .matches(/([01]?[0-9]|2[0-3]):[0-5][0-9]/)
      .required("Pflichtfeld")
  })
});

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {
        name: "",
        desc: "",
        cuisine: "",
        priceClass: "",
        adress: {
          street: "",
          postcode: "",
          city: ""
        },
        contactInfo: {
          email: "",
          phone: ""
        },
        businessHours: [
          {
            day: "",
            openingHour: "",
            closingHour: ""
          }
        ],
        media: {
          photoURL: "",
          logoURL: ""
        }
      },
      uid: ""
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getRestaurantData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  delteFromStorage(downloadURL) {
    const fileRef = storage.refFromURL(downloadURL);
    fileRef.delete();
  }

  getRestaurantData() {
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
      <Container>
        <Header as="h1">
          Restaurant
          <Header.Subheader>Angaben zum Restaurant bearbeiten</Header.Subheader>
        </Header>
        <Form
          enableReinitialize={true}
          initialValues={this.state.formValues}
          onSubmit={this.handleSubmit}
          // validationSchema={ValidationSchema}
          render={({ values, form }) => (
            <Container>
              <Form.Children>
                <Segment basic>
                  <AboutRestaurantSegment />
                  <BusinessHoursSegment formValue={values} />
                  <ContactSegment />
                  <MediaSegment form={form} />
                  <Button.Submit size="big" floated="right">
                    Speichern
                  </Button.Submit>
                </Segment>

                {/* <ShowPropsInUI data={values} /> */}
              </Form.Children>
            </Container>
          )}
        />
      </Container>
    );
  }
}

export default Restaurant;
