import React, { Component } from "react";
import { Segment, Header, Icon, Button } from "semantic-ui-react";
import Dropzone from "react-dropzone";
import Thumb from "./localImageThumb";

class ImageDropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: undefined
    };
  }

  onChange = this.props.onChange;

  deteleFile = () => {
    this.setState({ file: undefined });
    this.onChange(undefined);
  };

  renderDropZone = () => {};

  render() {
    return (
      <Dropzone
        accept="image/*"
        onDrop={acceptedFiles => {
          // do nothing if no files
          if (acceptedFiles.length === 0) {
            return;
          }
          this.setState({ file: acceptedFiles[0] });
          this.onChange(acceptedFiles[0]);
        }}
      >
        {({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => {
          let file = acceptedFiles[0];

          if (this.state.file) {
            console.log("file is in state in imagedropzone", file);
            return (
              <div>
                <React.Fragment>
                  <Thumb file={this.state.file} />
                  <Button
                    fluid
                    type="button"
                    size="mini"
                    content="Bild löschen"
                    color="red"
                    basic
                    onClick={this.deteleFile}
                  />
                </React.Fragment>
              </div>
            );
          }

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
                <Header icon textAlign="center" size="small" color={color}>
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
    );
  }
}

export default ImageDropZone;
