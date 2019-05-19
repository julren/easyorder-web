import React, { Component } from "react";
import { RestaurantContext } from "./RestaurantContextWrapper";
// create the consumer as higher order component
// + pass through Component.navigationOptions to retain navigation options!
export const withRestaurantContext = ChildComponent => {
  class RestaurantContextConsumer extends Component {
    render() {
      return (
        <RestaurantContext.Consumer>
          {context => (
            <ChildComponent {...this.props} restaurantContext={context} />
          )}
        </RestaurantContext.Consumer>
      );
    }
  }
  return RestaurantContextConsumer;
};
