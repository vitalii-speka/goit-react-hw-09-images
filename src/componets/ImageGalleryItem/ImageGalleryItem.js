import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ photo }) {
  return (
    <>
      <li className={styles.item}>
        <img
          className={styles.image}
          src={photo.webformatURL}
          data-large-url={photo.largeImageURL}
          alt={photo.tags}
        />
      </li>
    </>
  );
}

ImageGalleryItem.defaultProps = {
  largeImageURL: "",
  webformatURL: "",
  tags: "",
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
