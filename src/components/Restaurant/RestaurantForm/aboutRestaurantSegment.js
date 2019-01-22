import React from "react";
import { FieldArray } from "formik";
import { Table, Segment, Container, Header, Divider } from "semantic-ui-react";
import { Dropdown, Input, Form, TextArea } from "formik-semantic-ui";
import { PRICECLASSES } from "../../../utils/globalConstants";

const AboutRestaurantSegment = props => {
  return (
    <Container style={{ marginBottom: "5em " }}>
      <Header dividing as="h3" color="blue">
        Über das Restaurant
      </Header>
      <Input label="Name" name="name" />
      <TextArea label="Beschreibung" name="desc" />
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
    </Container>
  );
};

export default AboutRestaurantSegment;
