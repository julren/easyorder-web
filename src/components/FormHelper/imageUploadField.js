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
      <Segment basic>
        {isFile && <LocalImageThumb file={fieldValue} />}

        {isURL && (
          <Image
            src={fieldValue}
            centered
            style={{
              objectFit: "contain"
            }}
          />
        )}

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

  return (
    <Segment basic>
      {fieldIsEmpty && (
        <ImageDropZone
          onChange={newValue => {
            form.setFieldValue(field.name, newValue, true);
          }}
        />
      )}

      {!fieldIsEmpty && renderDeletableImage()}
    </Segment>
  );
};

export default ImageUploadField;
