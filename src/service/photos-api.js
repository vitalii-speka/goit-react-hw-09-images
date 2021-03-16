// import React from "react";
const URL = "https://pixabay.com/api/";
const KEY = "19138235-266d6c5ac156d39437978a172";

export default function fethPhotosAPI(searchName, page) {
  return fetch(
    `${URL}?key=${KEY}&q=${searchName}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`There are no images for your query ${searchName}`)
    );
  });
}
