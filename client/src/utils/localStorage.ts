import SavedMovies from "../pages/SavedMovies";

export const getSavedMovieIds = () => {
  // allows us to retrieve the movie
  const savedMovieIds = localStorage.getItem('save_movies')
    ? JSON.parse(localStorage.getItem('save_movies') || '[]')
    : [];
  // const savedMovieIds = localStorage.getItem('save_movies')
  //   ? JSON.parse(localStorage.getItem('save_movies'))
  //   : [];

  return savedMovieIds;
};


// allows us to export the movie ids
export const saveMovieIds = (MovieIdArr: string[]) => {
  if (MovieIdArr.length) {
    localStorage.setItem('save_movies', JSON.stringify(MovieIdArr));
  } else {
    // if there is no movie name, remove it
    localStorage.removeItem('save_movies');
  }
};
// allows us to remove the movie

export const removeMovieId = (movieId: string): boolean => {
  const savedMovieIds: string[] | null = localStorage.getItem('save_movies')
    ? JSON.parse(localStorage.getItem('save_movies') || '[]')
    : null;

  if (!savedMovieIds) {
    return false;
  }

  // updating the movies in the local storage
  const updatedSavedMovieIds: string[] = savedMovieIds.filter((savedMovieId: string) => savedMovieId !== movieId);
  localStorage.setItem('save_movies', JSON.stringify(updatedSavedMovieIds));
  return true;
};

