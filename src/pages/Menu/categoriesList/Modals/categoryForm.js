import React from "react";
import { Form, Input, Button } from "formik-semantic-ui";
import * as Yup from "yup";
import PropTypes from "prop-types";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Pflichtfeld"),
  description: Yup.string().required("Pflichtfeld")
});

const CategoryForm = props => {
  return (
    <Form {...props} validationSchema={ValidationSchema}>
      <Input type="text" name="name" label="Name" />
      <Input type="text" name="description" label="Beschreibung" />
      <Button.Submit content="Speichern" />
    </Form>
  );
};

CategoryForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default CategoryForm;
