import React, { Component } from "react";

import { firebaseRestaurants, firebase } from "../../config/firebase";
import { Header, Segment, Container, Divider } from "semantic-ui-react";
import { Form, Button } from "formik-semantic-ui";
import * as Yup from "yup";
import ShowPropsInUI from "../../utils/ShowPropsInUI";
import { storage } from "../../config/firebase";
import BusinessHoursSegment from "./RestaurantForm/businessHoursSegment";
import AboutRestaurantSegment from "./RestaurantForm/aboutRestaurantSegment";
import MediaSegment from "./RestaurantForm/mediaSegment";
import ContactSegment from "./RestaurantForm/contactSegment";

import StorageHandler from "../FormHelper/storageHandler";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantDoc: undefined,
      formValues: placeholderRestaurantValues
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getRestaurantDoc();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getRestaurantDoc() {
    firebaseRestaurants
      .where("author", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          return;
        } else {
          let doc = querySnapshot.docs[0];
          if (this._isMounted) {
            this.setState({ restaurantDoc: doc, formValues: doc.data() });
          }
        }
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  }

  async createNewRestaurantDoc(data) {
    data = { author: firebase.auth().currentUser.uid, ...data };

    await firebaseRestaurants
      .add(data)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        return;
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  async updateRestaurantDoc(restaurantDoc, data) {
    restaurantDoc.ref
      .update(data)
      .then(function() {
        console.log("Updated successfully");
        return;
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
  }

  deleteFromStorage = downloadURL => {
    const fileRef = storage.refFromURL(downloadURL);
    fileRef
      .delete()
      .then()
      .catch(error => {
        console.log(error);
      });
    return;
  };

  handleSubmit = async (values, formikApi) => {
    console.log("handleSubmit formValues", values);
    const { restaurantDoc } = this.state;
    const { coverPhoto, logo } = values.media;

    const hasPhotoFile = coverPhoto instanceof Blob;
    const hasLogoFile = logo instanceof Blob;

    let dataToSubmit = values;

    if (hasPhotoFile) {
      const fileName = `coverPhoto-${firebase.auth().currentUser.uid}`;
      await StorageHandler.uploadImage({
        file: coverPhoto,
        fileName: fileName
      }).then(downloadURL => {
        dataToSubmit.media.coverPhoto = downloadURL;
        console.log("photoFile await done");
      });
    }
    if (hasLogoFile) {
      const fileName = `logo-${firebase.auth().currentUser.uid}`;
      await StorageHandler.uploadImage({ file: logo, fileName: fileName }).then(
        downloadURL => {
          dataToSubmit.media.logo = downloadURL;
          console.log("logoFile await done");
        }
      );
    }

    if (restaurantDoc) {
      this.updateRestaurantDoc(restaurantDoc, dataToSubmit).then(() => {
        return formikApi.setSubmitting(false);
      });
    } else {
      this.createNewRestaurantDoc(dataToSubmit).then(() => {
        return formikApi.setSubmitting(false);
      });
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
          render={({ values }) => (
            <Container>
              <Form.Children>
                <AboutRestaurantSegment />
                <BusinessHoursSegment formValues={values} />
                <ContactSegment />
                <MediaSegment />
                <Divider hidden />
                <Segment basic>
                  <Button.Submit floated="right">Speichern</Button.Submit>
                </Segment>

                <ShowPropsInUI data={values} />
              </Form.Children>
            </Container>
          )}
        />
      </Container>
    );
  }
}

export default Restaurant;

const placeholderRestaurantValues = {
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
    coverPhoto: "",
    logo: ""
  }
};
