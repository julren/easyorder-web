import React, { Component } from "react";
import { Segment, Statistic, Header } from "semantic-ui-react";
import { firebaseOrders } from "../../config/firebase";
import { withRestaurantContext } from "../../contexts/withRestaurantContext";
import moment from "moment";

const TODAY = moment().startOf("day");
const A_WEEK_OLD = moment()
  .subtract(7, "days")
  .startOf("day");
const A_MONTH_OLD = moment()
  .subtract(1, "month")
  .startOf("day");

const SalesReport = props => {
  const orders = props.restaurantContext.orderDocs.map(orderDoc => {
    return {
      ...orderDoc.data(),
      orderDate: orderDoc.data().orderDate.toDate()
    };
  });

  const salesToday = orders
    .filter(order => moment(order.orderDate).isSame(TODAY))
    .map(order => order.grandTotal)
    .reduce((total, element) => {
      return total + element;
    }, 0);
  const salesLastWeek = orders
    .filter(order => moment(order.orderDate).isAfter(A_WEEK_OLD))
    .map(order => order.grandTotal)
    .reduce((total, element) => {
      return total + element;
    }, 0);

  const salesLastMonth = orders
    .filter(order => moment(order.orderDate).isAfter(A_MONTH_OLD))
    .map(order => order.grandTotal)
    .reduce((total, element) => {
      return total + element;
    }, 0);

  return (
    <Segment.Group>
      <Segment color="blue" inverted>
        <Header as="h2">💰 Umsatz</Header>
      </Segment>
      <Segment>
        <Statistic.Group size="small" widths="three">
          <Statistic>
            <Statistic.Value>{salesToday.toFixed(0)}€</Statistic.Value>
            <Statistic.Label>Heute</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{salesLastWeek.toFixed(0)}€</Statistic.Value>
            <Statistic.Label>Woche</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{salesLastMonth.toFixed(0)}€</Statistic.Value>
            <Statistic.Label>Monat</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>
    </Segment.Group>
  );
};

export default withRestaurantContext(SalesReport);
