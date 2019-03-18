import React, { Component } from "react";
import { Form, Input, Button } from "formik-semantic-ui";
import { Grid, Segment } from "semantic-ui-react";
import { Field } from "formik";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Pflichtfeld"),
  capacity: Yup.number().required("Pflichtfeld")
});

const TableForm = ({ onSubmit, initialValues = placholderValues }) => {
  return (
    <Segment clearing basic>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={ValidationSchema}
      >
        <Input type="text" name="name" label="Name" />
        <Input type="text" name="capacity" label="Sitzplätze" />
        <Button.Submit content="Speichern" floated="right" />
      </Form>
    </Segment>
  );
};
export default TableForm;

const placholderValues = { name: "", capacity: 0 };
