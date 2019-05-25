import React from "react";
import { List, Modal, Feed, Rating, Icon } from "semantic-ui-react";
import { firebaseMenuItemReviews } from "../../../config/firebase";
import RatingDistributionChart from "../../../components/RatingDistributionChart";
class MenuItemReviewsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [] };
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews = () => {
    firebaseMenuItemReviews
      .where("menuItemID", "==", this.props.menuItemDoc.id)
      .get()
      .then(querySnapshot => {
        console.log("found firebaseMenuItemReviews docs: ", querySnapshot.docs);
        const reviews = querySnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            reviewDate: doc.data().reviewDate.toDate()
          };
        });

        this.setState({ reviews: reviews });
      });
  };

  render() {
    const { open, onClose, menuItemDoc } = this.props;
    const { reviews } = this.state;
    return (
      <Modal dimmer={true} open={open} onClose={onClose}>
        <Modal.Header style={{ backgroundColor: "#008ACD", color: "#fff" }}>
          Bewertungen für {menuItemDoc.data().name}
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <RatingDistributionChart rating={menuItemDoc.data().rating} />

            {reviews.length === 0 && <h3>Keine Bewertungen bisher.</h3>}
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
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default MenuItemReviewsModal;
