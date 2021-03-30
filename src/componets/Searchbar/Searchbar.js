import React, { useState } from 'react';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchName === '') {
      return toast.info('please, enter your request');
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header onSubmit={handleSubmit} className={s.SearchBar}>
      <form className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          name="searchName"
          value={searchName}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

/*class Searchbar extends Component {
  state = {
    searchName: "",
  };

  handleNameChange = (event) => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.searchName === "") {
      return toast.info("please, enter your request");
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: "" });
  };

  render() {
    return (
      <header onSubmit={this.handleSubmit} className={s.SearchBar}>
        <form className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            name="searchName"
            value={this.state.searchName}
            onChange={this.handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar; */
