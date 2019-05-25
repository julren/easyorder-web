import React, { Component } from "react";
import RatingDistributionChart from "../../components/RatingDistributionChart";
import {
  Segment,
  Feed,
  Icon,
  Rating,
  Header,
  CommentAvatar,
  List,
  Image
} from "semantic-ui-react";
import {
  firebase,
  firebaseRestaurantReviews,
  firebaseRestaurants,
  firebaseMenuItemReviews
} from "../../config/firebase";
import moment from "moment";

class MenuItemsReviewsReport extends Component {
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

    const reviews = await this.getReviews();

    this.setState({ loading: false, reviews: reviews });
  }

  getReviews = async () => {
    return firebaseMenuItemReviews
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

  render() {
    const { reviews, restaurant, loading } = this.state;
    return (
      <Segment.Group>
        <Segment color="blue" inverted>
          <Header as="h2">⭐️ Gerichtebewertungen</Header>
        </Segment>

        <Segment loading={loading}>
          <Header as="h4">Die neuststen Gerichtebewerungen</Header>
          <List relaxed>
            {reviews.map((review, index) => (
              <List.Item key={index}>
                <Image avatar src={review.photo} />
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

export default MenuItemsReviewsReport;
