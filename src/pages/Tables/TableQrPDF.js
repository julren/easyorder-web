import React from "react";

import PropTypes from "prop-types";

import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Font,
  PDFDownloadLink,
  PDFViewer
} from "@react-pdf/renderer";
import qr from "qr-image";
import playStoreButtonImg from "./assets/get-it-on-google-play-button.png";
import appStoreButtonImg from "./assets/get-it-on-app-store-button.png";
import banner from "./assets/qr-pinup-banner.jpg";
import logo from "./assets/logo.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignContent: "center"
  },
  section: {
    flexDirection: "column",
    margin: 10,
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  logo: {
    height: 50,
    maxWidth: 150
  },
  qr: {
    height: 110,
    width: 110
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 8,
    height: 70,
    backgroundColor: "#008ACD",
    color: "#fff"
  },
  appStoreButton: {
    maxHeight: 100,
    width: 100,
    padding: 5
  },
  appStoreButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  descText: {
    fontSize: 12,
    fontFamily: "Helvetica",
    textAlign: "center",
    color: "#4A4A4A"
  },
  welcomeText: {
    fontSize: 18,
    padding: 20,
    fontFamily: "Helvetica-Bold",
    color: "#202020"
  },
  getAppText: {
    fontFamily: "Helvetica",
    padding: 8,
    fontSize: 12
  },
  coverPhoto: {
    maxHeight: 200
  }
});

// Create Document Component
const MyDocument = props => {
  const { qrText, restaurantName = "La Dolce Vita" } = props;
  const qr_png = qr.imageSync(qrText, {
    type: "png",
    size: 60,
    margin: 0
  });

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} source={logo} />
        </View>

        <Image
          style={styles.coverPhoto}
          src={{
            method: "GET",
            uri: banner
          }}
        />

        <View style={styles.section}>
          <Text
            style={styles.welcomeText}
          >{`Wilkommen bei ${restaurantName}`}</Text>
          <Text style={styles.descText}>
            {`Nutzen Sie die EasyOrder App, um bequem per Smartphone zu bestellen. Stellen Sie in der App ihr Menü zusammen und scannen Sie den QR-Code, um die Bestellung aufzugeben.`}
          </Text>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image style={styles.qr} source={{ data: qr_png, format: "png" }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.getAppText}>EasyOrder runterladen</Text>
          <View style={styles.appStoreButtonsContainer}>
            <Image style={styles.appStoreButton} source={appStoreButtonImg} />
            <Image style={styles.appStoreButton} source={playStoreButtonImg} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: 12,
            backgroundColor: "#008ACD",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#D4E5EE", fontSize: 6 }}>{qrText}</Text>
        </View>
      </Page>
    </Document>
  );
};

const TableQrPDFViewer = props => {
  const { qrText = "placeholder", style } = props;

  return (
    <PDFViewer style={{ ...style }}>
      <MyDocument qrText={qrText} />
    </PDFViewer>
  );
};

const TableQrPDFDownloadLink = props => {
  const { qrText = "placeholder" } = props;

  return (
    <PDFDownloadLink
      document={<MyDocument qrText={qrText} />}
      fileName={`EasyOrder_TableCode_InfoDisplay_${qrText}.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Lade PDF..." : "Jetzt runterladen!"
      }
    </PDFDownloadLink>
  );
};
export default TableQrPDFViewer;
export { TableQrPDFViewer, TableQrPDFDownloadLink };

TableQrPDFViewer.propTypes = {
  qrText: PropTypes.string.isRequired
};

TableQrPDFDownloadLink.propTypes = {
  qrText: PropTypes.string.isRequired
};
