import React from "react";
import { Icon, Image, Button } from "semantic-ui-react";

const ImageThumbnails = props => {
  console.log("props.imageURLs", props.imageURLs);
  const imageURLs = props.imageURLs;

  if (imageURLs.length) {
    return imageURLs.map((item, index) => (
      <div key={index}>
        <Image src={item} size="tiny" />
      </div>
    ));
  } else {
    return null;
  }
};
export default ImageThumbnails;
