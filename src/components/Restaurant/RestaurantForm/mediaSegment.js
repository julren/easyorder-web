import React from "react";
import { FieldArray } from "formik";
import {
  Table,
  Segment,
  Header,
  Card,
  Button,
  Image,
  Container
} from "semantic-ui-react";
import { Dropdown, Input, Form, TextArea } from "formik-semantic-ui";
import { PRICECLASSES } from "../../../utils/globalConstants";
import { Field } from "formik";
import FileUpload from "../../FormHelper/fileUpload";
import { firebase } from "../../../config/firebase";

const MediaSegment = props => {
  const form = props.form;

  const deletePhotoURL = downloadURL => {
    this.delteFromStorage(downloadURL);
    form.setFieldValue("media.photoURL", "", true);
  };

  const deleteLogoURL = downloadURL => {
    this.delteFromStorage(downloadURL);
    form.setFieldValue("media.logoURL", "", true);
  };

  const UploadCard = props => {
    const formFieldName = props.formFieldName;
    const fileName = props.fileName;
    const cardTitle = props.cardTitle;

    return (
      <Card>
        <Card.Content>
          <Card.Description>{cardTitle}</Card.Description>
        </Card.Content>
        <Field
          name={formFieldName}
          render={({ field, form }) => {
            if (field.value !== "") {
              return (
                <React.Fragment>
                  <Image
                    style={{
                      height: "250px",
                      objectFit: "contain"
                    }}
                    src={field.value}
                  />
                  <Card.Content>
                    <Button
                      basic
                      color="red"
                      onClick={() => deletePhotoURL(field.value)}
                    >
                      Löschen
                    </Button>
                  </Card.Content>
                </React.Fragment>
              );
            } else {
              return (
                <FileUpload
                  name={formFieldName}
                  fileName={`${firebase.auth().currentUser.uid}-${fileName}`}
                />
              );
            }
          }}
        />
      </Card>
    );
  };

  return (
    <Container style={{ marginBottom: "2em" }}>
      <Header dividing as="h3" color="blue">
        Bilder
      </Header>
      <Card.Group itemsPerRow={2}>
        <UploadCard
          cardTitle="Titelbild"
          formFieldName="media.photoURL"
          fileName="photoURL"
        />
        <UploadCard
          cardTitle="Logo"
          formFieldName="media.logoURL"
          fileName="logoURL"
        />
      </Card.Group>
    </Container>
  );
};

export default MediaSegment;
