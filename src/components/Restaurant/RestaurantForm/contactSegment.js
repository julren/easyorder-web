import React from "react";
import { FieldArray } from "formik";
import { Table, Segment, Header, Divider, Container } from "semantic-ui-react";
import { Dropdown, Input, Form, TextArea } from "formik-semantic-ui";
import { PRICECLASSES } from "../../../utils/globalConstants";

const ContactSegment = props => {
  return (
    <Container style={{ marginBottom: "5em" }}>
      <Header dividing as="h3" color="blue">
        Kontakt
      </Header>
      <Input label="Straße" name="adress.street" />
      <Form.Group widths="2">
        <Input label="PLZ" name="adress.postcode" />
        <Input label="Ort" name="adress.city" />
      </Form.Group>
      <Form.Group widths="2">
        <Input label="Telefon" name="contactInfo.phone" />
        <Input label="Email" name="contactInfo.email" />
      </Form.Group>
    </Container>
  );
};

export default ContactSegment;
