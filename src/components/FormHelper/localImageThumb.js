import React from "react";
import { Image, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";
export default class LocalImageThumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined
  };

  componentDidMount() {
    this.readFile();
  }

  readFile = () => {
    this.setState({ loading: true }, () => {
      let reader = new FileReader();
      let file = this.props.file;

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(file);
    });
  };

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return null;
    }

    if (loading) {
      return <Loader>Loading</Loader>;
    }
    return (
      <Image
        src={thumb}
        size="medium"
        style={{
          objectFit: "contain"
        }}
      />
    );
  }
}

LocalImageThumb.propTypes = {
  file: PropTypes.object
};
