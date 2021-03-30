import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import Loader from 'react-loader-spinner';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({
  onClose,
  children,
  currentImgObjUrl,
  currentImgObjAlt,
}) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
        setIsImageLoading(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
      setIsImageLoading(true);
    }
  };

  const onImageLoad = () => {
    setIsImageLoading(false);
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        {isImageLoading && (
          <Loader type="Watch" color="#fff" height={500} width={500} />
        )}
        <img
          src={currentImgObjUrl}
          alt={currentImgObjAlt}
          onLoad={onImageLoad}
        />
        {children}
      </div>
    </div>,
    modalRoot,
  );
}

/*  class Modal extends Component {
  state = {
    isImageLoading: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
      this.setState({ isImageLoading: true });
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
      this.setState({ isImageLoading: true });
    }
  };

  onImageLoad = () => {
    this.setState({ isImageLoading: false });
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          {this.state.isImageLoading && (
            <Loader type="Watch" color="#fff" height={500} width={500} />
          )}
          <img src={src} alt={alt} onLoad={this.onImageLoad} />
          {this.props.children}
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal; */
