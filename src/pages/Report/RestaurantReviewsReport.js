import React, { Component } from "react";
import RatingDistributionChart from "../../components/RatingDistributionChart";
import { Segment, Feed, Icon, Rating, Header, List } from "semantic-ui-react";
import {
  firebase,
  firebaseRestaurantReviews,
  firebaseRestaurants
} from "../../config/firebase";
import moment from "moment";

class RestaurantReviewsReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      loading: true,
      restaurant: undefined
    };
  }

  async componentDidMount() {
    // firebaseRestaurants.doc(firebase.auth().currentUser.uid).get().then()

    const restaurant = await this.getRestaurant();
    const reviews = await this.getReviews();

    this.setState({ loading: false, restaurant: restaurant, reviews: reviews });
  }

  getReviews = async () => {
    return firebaseRestaurantReviews
      .where("restaurantID", "==", firebase.auth().currentUser.uid)
      .orderBy("reviewDate")
      .limit(5)
      .get()
      .then(querySnapshot => {
        let reviews = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            reviews.push({
              ...doc.data(),
              reviewDate: doc.data().reviewDate.toDate()
            });
          });
        }
        return reviews;
      });
  };

  getRestaurant = () => {
    return firebaseRestaurants
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        } else {
          return null;
        }
      });
  };

  render() {
    const { reviews, restaurant, loading } = this.state;
    return (
      <Segment.Group>
        <Segment color="blue" inverted>
          <Header as="h2">⭐️ Restaurantbewertungen</Header>
        </Segment>

        <Segment loading={loading}>
          <RatingDistributionChart
            rating={restaurant ? restaurant.rating : undefined}
          />

          <Header as="h4">Die neusten Restaurantbewertungen</Header>

          <List relaxed>
            {reviews.map((review, index) => (
              <List.Item key={index}>
                <List.Icon name="user" size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header>
                    {review.menuItemName} {moment(review.reviewDate).fromNow()}
                  </List.Header>
                  <List.Description>
                    <Rating
                      size="tiny"
                      icon="star"
                      defaultRating={review.rating}
                      maxRating={5}
                      disabled
                      style={{ marginRight: 5 }}
                    />

                    {review.text}
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}

export default RestaurantReviewsReport;
