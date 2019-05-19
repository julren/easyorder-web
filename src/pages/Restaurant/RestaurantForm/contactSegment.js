import React from "react";
import { Header, Container, Segment } from "semantic-ui-react";
import { Input, Form } from "formik-semantic-ui";

const ContactSegment = props => {
  return (
    <Segment.Group>
      <Segment color="blue" inverted>
        <Header as="h3">Kontakt</Header>
      </Segment>
      <Segment>
        <Input label="Straße" name="address.street" />
        <Form.Group widths="2">
          <Input label="PLZ" name="address.postcode" />
          <Input label="Ort" name="address.city" />
        </Form.Group>
        <Form.Group widths="2">
          <Input label="Telefon" name="contactInfo.phone" />
          <Input label="Email" name="contactInfo.email" />
        </Form.Group>
      </Segment>
    </Segment.Group>
  );
};

export default ContactSegment;
