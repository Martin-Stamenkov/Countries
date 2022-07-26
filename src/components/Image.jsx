import React from "react";
import PropTypes from "prop-types";

export  function Image(props) {
  const {src, style} = props;
  return (
    <img
      style={style}
      src={src}
      alt="custom"
    />
  );
}
Image.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};
