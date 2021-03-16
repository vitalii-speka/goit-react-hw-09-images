import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGallery.module.css";

function ImageGallery({ photos, onClick }) {
  return (
    <ul className={s.imageGallery} onClick={onClick}>
      {photos.map((photo) => (
        <ImageGalleryItem key={photo.id} photo={photo} />
      ))}
    </ul>
  );
}

ImageGallery.defaultProps = {
  photos: [],
};

ImageGallery.propTypes = {
  photos: PropTypes.array,
};

export default ImageGallery;
