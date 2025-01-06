export const getSavedMovieIds = () => {
  // allows us to store the movie
  const savedMovieIds = localStorage.getItem('save_movies')
    ? JSON.parse(localStorage.getItem('save_movies'))
    : [];

  return savedMovieIds;
};


// allows us to export the movie ids
export const saveMovieIds = (MovieIdArr) => {
  if (MovieIdArr.length) {
    
    localStorage.setItem('save_movie', JSON.stringify(MovieIdArr));
  } else {
    // if there is no movie name, remove it
    localStorage.removeItem('save_movies');
  }
};

export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  // updating the movies in the local storage
  const updatedSavedMovieIds = savedMovieIds?.filter((savedMovieId) => savedMovieId !== movieId);
  localStorage.setItem('save_movies', JSON.stringify(updatedSavedMovieIds));

  return true;
};
