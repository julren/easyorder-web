import React from "react";
import { Form, Input, Button } from "formik-semantic-ui";
import PropTypes from "prop-types";
import { Field } from "formik";
import { Grid } from "semantic-ui-react";
import ImageUploadField from "../../../components/formHelper/imageUploadField";

const placholderValues = {
  name: "",
  description: "",
  price: 0.0,
  photo: ""
};

const MenuItemForm = ({ onSubmit, initialValues = placholderValues }) => {
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {() => (
        <Form.Children>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width="6">
                <Field name="photo" component={ImageUploadField} />
              </Grid.Column>
              <Grid.Column width="10">
                <Input type="text" name="name" label="Name" />
                <Input type="text" name="description" label="Beschreibung" />
                <Input
                  inputProps={{
                    type: "number",
                    step: "0.1",
                    pattern: "[0-9]+([,.][0-9]+)?"
                  }}
                  name="price"
                  label="Preis"
                />
                <Button.Submit content="Speichern" floated="right" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Children>
      )}
    </Form>
  );
};

export default MenuItemForm;

MenuItemForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};
