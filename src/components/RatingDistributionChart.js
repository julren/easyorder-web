import React, { PureComponent } from "react";
import { Rating, Progress, Grid } from "semantic-ui-react";

class RatingDistributionChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { rating = fallbackRating } = this.props;

    const {
      ratingDistribution = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      totalNumRatings = 0,
      totalRatingPoints = 0,
      avgRating = 0.0
    } = rating;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div style={{ flexDirection: "column", display: "flex", flex: 7 }}>
          {Object.keys(ratingDistribution)
            .sort((a, b) => b - a)
            .map((key, index) => {
              return (
                <div
                  key={index}
                  style={{ flex: 1, display: "flex", alignItems: "center" }}
                >
                  <div style={{ flexShrink: 1, paddingRight: 10 }}>
                    <h4>{key}</h4>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Progress
                      style={{ marginBottom: 2, flex: 1 }}
                      size="small"
                      percent={
                        ((ratingDistribution[key] * parseInt(key)) /
                          totalRatingPoints) *
                        100
                      }
                      warning
                    />
                  </div>
                  <p style={{ color: "grey", marginLeft: 4 }}>
                    ({ratingDistribution[key]})
                  </p>
                </div>
              );
            })}
        </div>

        <div
          style={{
            flexDirection: "column",
            display: "flex",
            flex: 1,
            paddingLeft: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <>
            <h1 style={{ marginBottom: 0 }}>{avgRating.toFixed(1)}</h1>

            <Rating
              rating={avgRating}
              maxRating={5}
              disabled
              icon="star"
              size="small"
            />

            <p style={{ color: "grey" }}>({totalNumRatings})</p>
          </>
        </div>
      </div>
    );
  }
}

export default RatingDistributionChart;

const fallbackRating = {
  ratingDistribution: {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0
  },
  totalNumRatings: 0,
  totalRatingPoints: 0,
  avgRating: 0
};
