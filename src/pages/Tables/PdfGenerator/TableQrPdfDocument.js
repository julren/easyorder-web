import React from "react";

import PropTypes from "prop-types";

import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet
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
  },
  footer: {
    flex: 1,
    height: 12,
    backgroundColor: "#008ACD",
    justifyContent: "center",
    alignItems: "center"
  },
  footerText: {
    color: "#D4E5EE",
    fontSize: 6
  }
});

// Create Document Component
const TableQrPdfDocument = props => {
  const { tableDoc, restaurantDoc } = props;
  const { name: tableName } = tableDoc.data();
  const { name: restaurantName } = restaurantDoc.data();

  const qrContent = JSON.stringify({
    restaurantId: restaurantDoc.id,
    restaurantName: restaurantName,
    tableId: tableDoc.id,
    tableName: tableName
  });

  const qr_png = qr.imageSync(qrContent, {
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
          <Text style={styles.welcomeText}>
            Einfach mit EasyOrder bestellen!
          </Text>
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
        <View style={styles.footer}>
          <Text style={styles.footerText}>{`${restaurantName} | ${
            restaurantDoc.id
          } | ${tableName} | ${tableDoc.id}`}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TableQrPdfDocument;
