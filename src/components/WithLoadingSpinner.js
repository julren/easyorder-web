import React from "react";
import { Loader } from "semantic-ui-react";

const WithLoadingSpinner = props => {
  const { loading = true } = props;

  return (
    <React.Fragment>
      {loading ? (
        <Loader size="big" active inline="centered" />
      ) : (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    </React.Fragment>
  );
};

export default WithLoadingSpinner;
