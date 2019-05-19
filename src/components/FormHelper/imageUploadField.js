import React from "react";
import { Segment, Image, Button } from "semantic-ui-react";
import LocalImageThumb from "./localImageThumb";
import ImageDropZone from "./imageDropZone";

const ImageUploadField = ({ form, field }) => {
  const fieldValue = field.value;

  const fieldIsEmpty = fieldValue === undefined || fieldValue.length === 0;
  const isFile = fieldValue instanceof Blob;
  const isURL =
    (typeof fieldValue === "string" || fieldValue instanceof String) &&
    fieldValue.length > 0;

  const onDelete = () => {
    return form.setFieldValue(field.name, "", true);
  };

  const renderDeletableImage = () => {
    return (
      <Segment basic compact>
        {isFile && <LocalImageThumb file={fieldValue} />}

        {isURL && <Image src={fieldValue} size="medium" />}

        <Button
          type="button"
          size="mini"
          content="Löschen"
          color="red"
          basic
          style={{ marginTop: 5 }}
          onClick={onDelete}
        />
      </Segment>
    );
  };

  return (
    <>
      {fieldIsEmpty && (
        <ImageDropZone
          onChange={newValue => {
            form.setFieldValue(field.name, newValue, true);
          }}
        />
      )}

      {!fieldIsEmpty && renderDeletableImage()}
    </>
  );
};

export default ImageUploadField;
