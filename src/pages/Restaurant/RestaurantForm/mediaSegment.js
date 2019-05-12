import React from "react";
import { Header, Container, Grid } from "semantic-ui-react";
import { Field } from "formik";
import ImageUploadField from "../../../components/formHelper/imageUploadField";

const MediaSegment = () => {
  return (
    <Container>
      <Header dividing as="h3" color="blue">
        Bilder
      </Header>
      <Grid columns={2}>
        <Grid.Column>
          <Header as="h4" content="Coverfoto des Restaurants" />
          <Field name="media.coverPhoto" component={ImageUploadField} />
        </Grid.Column>
        <Grid.Column>
          <Header as="h4" content="Logo des Restaurants" />
          <Field name="media.logo" component={ImageUploadField} />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default MediaSegment;
