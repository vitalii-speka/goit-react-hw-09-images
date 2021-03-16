import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Searchbar from "./componets/Searchbar";
import fethPhotosAPI from "./service/photos-api";
import ImageGallery from "./componets/ImageGallery";
import Loader from "react-loader-spinner";
import Button from "./componets/Button";
import Modal from "./componets/Modal";

class App extends Component {
  state = {
    photos: [],
    searchName: "",
    // url: "https://pixabay.com/api/",
    // key: "19138235-266d6c5ac156d39437978a172",
    error: "",
    loading: false,
    page: 1,
    showModal: false,
    currentImgObj: { largeUrl: "", alt: "" },
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchName = prevState.searchName;
    const { searchName } = this.state;

    if (prevSearchName !== searchName) {
      await this.setState({ loading: true, photos: [], page: 1 });

      this.fetchProcessing(searchName);
    }
  }

  fetchProcessing = (searchName) => {
    const { page } = this.state;

    fethPhotosAPI(searchName, page)
      .then((photos) => {
        if (photos.hits.length === 0) {
          return toast.error("Sorry, your query was not found... ");
        }
        this.setState((prevState) => ({
          photos: [...prevState.photos, ...photos.hits],
          page: (prevState.page += 1),
          loading: false,
        }));
        this.scrollToBottom();
      })
      .catch(({ message }) => this.setState({ error: message }));
  };

  scrollToBottom = () => {
    if (this.state.page !== 2)
      window.scrollTo({
        top: document.documentElement.scrollTop + 450,
        behavior: "smooth",
      });
  };

  handleInputSubmit = (searchName) => {
    this.setState({ searchName });
    this.resetPage();
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  nextPage = (e) => {
    e.preventDefault();

    this.fetchProcessing(this.state.searchName);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleGalleryItemClick = (e) => {
    const largeUrl = e.target.dataset.largeUrl;
    const alt = e.target.alt;

    if (e.target.nodeName === "IMG") {
      this.setState({ currentImgObj: { largeUrl, alt } });
    }
    this.toggleModal();
  };

  render() {
    const { error, loading, photos, showModal, currentImgObj } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleInputSubmit} />

        {error && (
          <h1
            style={{
              padding: "10px 20px",
              textAlign: "center",
              color: "red",
            }}
          >
            {error.message}
          </h1>
        )}

        {photos.length > 0 && (
          <ImageGallery
            photos={photos}
            onClick={this.handleGalleryItemClick}
          ></ImageGallery>
        )}

        {photos.length >= 11 ? (
          <Button aria-label="Load more" onClick={this.nextPage}></Button>
        ) : null}

        {loading && (
          <Loader type="Puff" color="#000" height={600} width={600} />
        )}

        {showModal && (
          <Modal
            src={currentImgObj.largeUrl}
            alt={currentImgObj.alt}
            onClose={this.toggleModal}
          ></Modal>
        )}

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

export default App;
