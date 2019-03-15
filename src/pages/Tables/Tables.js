import React, { Component } from "react";
import { Container, Header, Grid } from "semantic-ui-react";
import { TableQrPDFViewer, TableQrPDFDownloadLink } from "./TableQrPDF";

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Header as="h1">
          Tische
          <Header.Subheader>
            Tische und anlegen, verwalten und Tisch-Codes generieren
          </Header.Subheader>
        </Header>

        <TableQrPDFViewer qrText="MeinCode" />
        <TableQrPDFDownloadLink qrText="MeinCode" />
      </Container>
    );
  }
}

export default Tables;
