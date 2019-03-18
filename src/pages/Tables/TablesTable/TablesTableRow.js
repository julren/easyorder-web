import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import TableDetailModal from "./TableDetailModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TableQrPdfDocument from "../PdfGenerator/TableQrPdfDocument";

class TablesTableRow extends Component {
  state = {
    modalOpen: false
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };
  closeModal = () => {
    this.props.onDataChange();
    this.setState({ modalOpen: false });
  };

  statusDisplayNames = {
    open: "Offen",
    inProgress: "In Bearbeitung",
    readyForServing: "Servierbereit",
    archived: "Archiviert"
  };

  render() {
    const { tableDoc } = this.props;
    const id = tableDoc.id;
    const { name, capacity } = tableDoc.data();
    return (
      <React.Fragment>
        <Table.Row>
          <Table.Cell>{id}</Table.Cell>

          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{capacity}</Table.Cell>

          <Table.Cell collapsing textAlign="right">
            <PDFDownloadLink
              document={<TableQrPdfDocument tableDoc={tableDoc} />}
              fileName={`EasyOrder_TableCode_InfoDisplay_${name}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? null : (
                  <Button
                    content="QR-Aufsteller"
                    icon="qrcode"
                    basic
                    compact
                    onClick={() => {
                      console.log("ok");
                    }}
                  />
                )
              }
            </PDFDownloadLink>

            <Button
              content="Details"
              icon="info circle"
              basic
              compact
              onClick={() => {
                this.openModal();
              }}
            />
          </Table.Cell>
        </Table.Row>
        <TableDetailModal
          tableDoc={tableDoc}
          open={this.state.modalOpen}
          onClose={this.closeModal}
        />
      </React.Fragment>
    );
  }
}

export default TablesTableRow;
