import React, { Component } from "react";
import Dropzone from "react-dropzone";
import {
  Form,
  Header,
  Icon,
  Progress,
  Segment,
  Image
} from "semantic-ui-react";

import { storage } from "../../config/firebase";

import { Field } from "formik";
import ImageThumbnails from "./imageThumbnails";
let fieldCounter = 0;

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.id = props.id || `field_fileupload_${fieldCounter++}`;
  }

  componentDidMount() {
    this.restaurantImagesRef = storage.ref();
  }

  uploadImages = files => {
    const imageURLs = [];
    let counter = 0;

    return new Promise((resolve, reject) => {
      files.forEach(file => {
        const filename = file.name;
        const storagePath = "images/resturants/" + filename;

        this.restaurantImagesRef
          .child(storagePath)
          .put(file)
          .then(snapshot => {
            console.log("Uploaded file " + filename, snapshot);

            snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log("File available at", downloadURL);
              imageURLs.push(downloadURL);
              counter++;
              console.log(
                "temp imageURLs after push",
                imageURLs,
                "counter",
                counter
              );
              if (counter === files.length) resolve(imageURLs);
            });
          });
      });
    });
  };

  handleDrop = (acceptedFiles, form) => {
    const formFieldName = this.props.name;
    console.log("handleDrop form form", form);
    console.log("handleDrop form acceptedFiles", acceptedFiles);

    this.uploadImages(acceptedFiles).then(imageURLs => {
      console.log("handledrop funciotn promise callbkac imageurls", imageURLs);
      form.setFieldValue(formFieldName, imageURLs, true);
    });

    // const reader = new FileReader();
    // reader.addEventListener(
    //   "load",
    //   () => {
    //     this.setState({ imageURLss: reader.result });
    //     form.setFieldValue(name, reader.result, true);
    //   },
    //   false
    // );
    // reader.readAsDataURL(acceptedFiles[0]);
  };

  delete = (form, value) => {
    const formFieldName = this.props.name;
    const processedImageURLs = form.values.imageURLs.fill(
      item => item !== value
    );
    this.setState({ imageURLs: processedImageURLs });
    form.setFieldValue(formFieldName, processedImageURLs, true);
  };

  render() {
    const { name, label, fieldProps = {}, inputProps = {} } = this.props;

    return (
      <Field
        name={name}
        render={({ field, form }) => {
          return (
            <Form.Field {...fieldProps}>
              {!!label && <label htmlFor={this.id}>{label}</label>}
              <Dropzone
                {...inputProps}
                onDrop={acceptedFiles => {
                  if (acceptedFiles.length) {
                    this.handleDrop(acceptedFiles, form);
                  }
                }}
              >
                {({ getRootProps, getInputProps, isDragActive }) => {
                  let color = isDragActive ? "blue" : "grey";
                  return (
                    <div {...getRootProps()}>
                      <Segment
                        style={{
                          border: "1px dashed rgba(34,36,38,.15)",
                          boxShadow: "none"
                        }}
                      >
                        <Header
                          icon
                          textAlign="center"
                          size="small"
                          color={color}
                        >
                          <Icon name="cloud upload" />

                          <Header.Content>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <React.Fragment>Hier ablegen...</React.Fragment>
                            ) : (
                              <div>
                                <React.Fragment>
                                  Dateien hier hineinziehen
                                  <Header.Subheader>
                                    Oder klicken um auszuwählen
                                  </Header.Subheader>
                                </React.Fragment>
                              </div>
                            )}
                          </Header.Content>
                        </Header>
                      </Segment>
                    </div>
                  );
                }}
              </Dropzone>
              <ImageThumbnails
                imageURLs={form.values.imageURLs}
                onDelete={value => this.delete(form, value)}
              />
            </Form.Field>
          );
        }}
      />
    );
  }
}

export default FileUpload;
