import React, { Component } from "react";
import axios from "axios";
import { firebaseRestaurants, firebase } from "../../config/firebase";
import { Header, Segment, Container, Divider } from "semantic-ui-react";
import { Form, Button } from "formik-semantic-ui";
import ShowPropsInUI from "../../utils/ShowPropsInUI";
import { storage } from "../../config/firebase";
import BusinessHoursSegment from "./restaurantForm/BusinessHoursSegment";
import AboutRestaurantSegment from "./restaurantForm/AboutRestaurantSegment";
import MediaSegment from "./restaurantForm/MediaSegment";
import ContactSegment from "./restaurantForm/ContactSegment";
import geohash from "ngeohash";

import StorageHandler from "../../components/formHelper/storageHandler";
import WithLoadingSpinner from "../../components/WithLoadingSpinner";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("restaurant not found");
          this.setState({ loading: false });
        } else {
          if (this._isMounted) {
            this.setState({
              loading: false,
              restaurantDoc: doc,
              formValues: doc.data()
            });
          }
        }
      })
      .catch(error => {
        console.error("Error getting document: ", error);
        this.setState({ loading: false });
      });
  }

  async saveRestaurant(data) {
    await firebaseRestaurants
      .doc(firebase.auth().currentUser.uid)
      .set({ ...data }, { merge: true })
      .then(() => {
        console.log("Document written");
        return;
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
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
    console.log("submitting formValues...:", values);
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
    if (values.address) {
      const { street, city, postcode } = values.address;
      await axios
        .get(
          `https://nominatim.openstreetmap.org/search?q=${street},${postcode}+${city}&format=json`
        )
        .then(resp => {
          if (resp.data.length > 0) {
            dataToSubmit.address.lat = resp.data[0].lat;
            dataToSubmit.address.lon = resp.data[0].lon;
            dataToSubmit.address.geohash = geohash.encode(
              resp.data[0].lat,
              resp.data[0].lon
            );
          }
        });
    }

    console.log("saving enhaced data to db: ", dataToSubmit);

    this.saveRestaurant(dataToSubmit).then(() => {
      return formikApi.setSubmitting(false);
    });
  };

  render() {
    return (
      <Container>
        <Header as="h1">
          Restaurant
          <Header.Subheader>Angaben zum Restaurant bearbeiten</Header.Subheader>
        </Header>
        <Segment loading={this.state.loading} clearing basic>
          <Form
            size="tiny"
            enableReinitialize={true}
            initialValues={this.state.formValues}
            onSubmit={this.handleSubmit}
            // validationSchema={ValidationSchema}
            render={({ values }) => (
              <Form.Children>
                <AboutRestaurantSegment />
                <BusinessHoursSegment formValues={values} />
                <ContactSegment />
                <MediaSegment />
                <Divider hidden />
                <Segment basic>
                  <Button.Submit floated="right">Speichern</Button.Submit>
                </Segment>
              </Form.Children>
            )}
          />
        </Segment>
      </Container>
    );
  }
}

export default Restaurant;

const placeholderRestaurantValues = {
  name: "",
  description: "",
  cuisine: "",
  priceClass: "",
  address: {
    street: "",
    postcode: "",
    city: "",
    lat: "",
    lon: ""
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
  },
};
// TODO: evtl rating felder erst bei firebase cloud functions anlegen
