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
import ImageCompressor from "image-compressor.js";
import { storage } from "../../config/firebase";

import { Field } from "formik";
let fieldCounter = 0;

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.id = props.id || `field_fileupload_${fieldCounter++}`;
  }

  componentDidMount() {
    this.storageRef = storage.ref();
  }

  compressImage(file) {
    return new Promise((resolve, reject) => {
      new ImageCompressor(file, {
        quality: 0.6,
        maxWidth: 400,
        success(result) {
          console.log("success compress");
          resolve(result);
        },
        error(e) {
          console.log(e.message);
        }
      });
    });
  }

  uploadImages = file => {
    let imageURL = "";

    const fileExtension = file.name.replace(/(.*)\.(.*?)$/, "$2");
    const filename = this.props.fileName + "." + fileExtension;

    return new Promise((resolve, reject) => {
      const storagePath = "public/images/" + filename;

      this.storageRef
        .child(storagePath)
        .put(file)
        .then(snapshot => {
          console.log("Uploaded file " + filename, snapshot);

          snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("File available at", downloadURL);
            imageURL = downloadURL;

            resolve(imageURL);
          });
        });
    });
  };

  handleDrop = (acceptedFiles, form) => {
    const formFieldName = this.props.name;
    console.log("handleDrop form form", form);
    console.log("handleDrop form acceptedFiles", acceptedFiles);

    this.compressImage(acceptedFiles[0]).then(compressedImage => {
      console.log("uploadImages step");

      this.uploadImages(compressedImage).then(imageURL => {
        console.log("handledrop funciotn promise callbkac imageurl", imageURL);
        form.setFieldValue(formFieldName, imageURL, true);
      });
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
                        placeholder
                        style={{
                          border: "1px dashed rgba(34,36,38,.15)",
                          boxShadow: "none",
                          flex: 1
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
                                  Bilder hier hineinziehen
                                  <Header.Subheader>
                                    Oder klicken, um den Auswahldialog zu öffnen
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
            </Form.Field>
          );
        }}
      />
    );
  }
}

export default FileUpload;
