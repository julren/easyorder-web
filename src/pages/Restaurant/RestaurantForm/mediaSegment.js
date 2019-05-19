import React from "react";
import { Header, Container, Grid, Segment } from "semantic-ui-react";
import { Field } from "formik";
import ImageUploadField from "../../../components/formHelper/imageUploadField";

const MediaSegment = () => {
  return (
    <Segment.Group>
      <Segment inverted color="blue">
        <Header as="h3">Sonstiges</Header>
      </Segment>
      <Segment.Group horizontal>
        <Segment>
          <Header as="h4" content="Coverfoto des Restaurants" />
          <Field name="media.coverPhoto" component={ImageUploadField} />
        </Segment>
        {/*   <Segment style={{ flex: 2 }}>
          <Header as="h4" content="Logo des Restaurants" />
          <Field name="media.logo" component={ImageUploadField} />
        </Segment> */}
      </Segment.Group>
    </Segment.Group>
  );
};

export default MediaSegment;
