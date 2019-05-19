import React, { Component } from "react";
import RatingDistributionChart from "../../components/RatingDistributionChart";
import { Segment, Feed, Icon, Rating, Header } from "semantic-ui-react";
import {
  firebase,
  firebaseRestaurantReviews,
  firebaseRestaurants
} from "../../config/firebase";

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
        if (!querySnapshot.empty) {
          let reviews = [];

          querySnapshot.forEach(doc => {
            reviews.push({
              ...doc.data(),
              reviewDate: doc.data().reviewDate.toDate()
            });
          });
          return reviews;
        }
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
          <Header as="h2">⭐️ Restaurantreviews</Header>
        </Segment>

        <Segment loading={loading}>
          <RatingDistributionChart
            rating={restaurant ? restaurant.rating : undefined}
          />

          <Header as="h4">Aktuellste Reviews</Header>

          <Feed size="small">
            {reviews.map((review, index) => (
              <Feed.Event key={index}>
                <Feed.Label>
                  <Icon name="user" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary
                    content={
                      <Rating
                        size="tiny"
                        icon="star"
                        defaultRating={review.rating}
                        maxRating={5}
                        disabled
                      />
                    }
                    date={review.reviewDate.toISOString().slice(0, 10)}
                  />

                  <Feed.Extra>{review.text}</Feed.Extra>
                </Feed.Content>
              </Feed.Event>
            ))}
          </Feed>
        </Segment>
      </Segment.Group>
    );
  }
}

export default RestaurantReviewsReport;
