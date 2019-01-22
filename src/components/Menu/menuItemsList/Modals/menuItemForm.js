import React from "react";
import { Form, Input, Button } from "formik-semantic-ui";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Field } from "formik";
import { Image, Card, Grid, Segment } from "semantic-ui-react";
import FileUpload from "../../../FormHelper/fileUpload";
import Dropzone from "react-dropzone";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Pflichtfeld"),
  description: Yup.string().required("Pflichtfeld")
});
const placholderValues = {
  name: "",
  description: "",
  price: undefined,
  photoURL: ""
};

const MenuItemForm = ({
  onSubmit,
  initialValues = placholderValues,
  fileName
}) => {
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {form => (
        <Form.Children>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width="6">
                {form.values.photoURL ? (
                  <Field
                    name="photoURL"
                    component={ImageThumb}
                    onDelete={() => form.setFieldValue("photoURL", "", true)}
                  />
                ) : (
                  <FileUpload name={"photoURL"} fileName={fileName} />
                )}
              </Grid.Column>
              <Grid.Column width="10">
                <Input type="text" name="name" label="Name" />
                <Input type="text" name="description" label="Beschreibung" />
                <Input type="number" name="price" label="Preis" />
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

const ImageThumb = ({ field, onDelete }) => {
  return (
    <Segment basic>
      <Image src={field.value} />
      <Button
        fluid
        type="button"
        size="mini"
        content="Bild löschen"
        color="red"
        basic
        onClick={onDelete}
      />
    </Segment>
  );
};
