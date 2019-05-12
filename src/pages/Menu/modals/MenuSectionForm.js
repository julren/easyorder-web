import React from "react";
import { Form, Input, Button } from "formik-semantic-ui";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Pflichtfeld"),
  description: Yup.string().required("Pflichtfeld")
});

const MenuSectionForm = props => {
  return (
    <Segment clearing basic>
      <Form {...props} validationSchema={ValidationSchema}>
        <Input type="text" name="name" label="Name" />
        <Input type="text" name="description" label="Beschreibung" />
        <Button.Submit content="Speichern" floated="right" />
      </Form>
    </Segment>
  );
};

MenuSectionForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default MenuSectionForm;
