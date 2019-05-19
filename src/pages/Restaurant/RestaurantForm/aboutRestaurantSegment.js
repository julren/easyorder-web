import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { Dropdown, Input, Form, TextArea } from "formik-semantic-ui";
import { PRICECLASSES } from "../../../utils/globalConstants";
import { Field } from "formik";
import ImageUploadField from "../../../components/formHelper/imageUploadField";

const AboutRestaurantSegment = props => {
  return (
    <Segment.Group>
      <Segment color="blue" inverted>
        <Header as="h3">Über das Restaurant</Header>
      </Segment>
      <Segment.Group horizontal>
        <Segment style={{ flex: 1 }}>
          <Header as="h4" style={{ marginBottom: 0 }}>
            Logo
          </Header>

          <Field name="media.logo" component={ImageUploadField} />
        </Segment>
        <Segment>
          <Input label="Name" name="name" />
          <TextArea label="Beschreibung" name="description" />
          <Form.Group widths="2">
            <Dropdown
              label="Preisklasse"
              name="priceClass"
              options={PRICECLASSES}
            />
            <Input
              label="Küchenart"
              name="cuisine"
              inputProps={{ placeholder: "Italienisch, Bayrisch, ..." }}
            />
          </Form.Group>
        </Segment>
      </Segment.Group>
    </Segment.Group>
  );
};

export default AboutRestaurantSegment;
