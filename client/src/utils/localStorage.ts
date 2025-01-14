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
<<<<<<< HEAD
export const saveMovieIds = (MovieIdArr: string[]) => {
  if (MovieIdArr.length) {
=======
export const saveMovieIds = (MovieIdArr: any) => {
  if (MovieIdArr.length) {

>>>>>>> ecae1304d75aff1089d98a1e4cbcc274dac87bd8
    localStorage.setItem('save_movies', JSON.stringify(MovieIdArr));
  } else {
    // if there is no movie name, remove it
    localStorage.removeItem('save_movies');
  }
};
// allows us to remove the movie

<<<<<<< HEAD
export const removeMovieId = (movieId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
=======
export const removeMovie = (movieId: any) => {
  const savedBookIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies') || 'null')
>>>>>>> ecae1304d75aff1089d98a1e4cbcc274dac87bd8
    : null;

  if (!savedBookIds) {
    return false;
  }

  // updating the movies in the local storage

  const updatedSavedMovieIds: string[] = savedBookIds?.filter((savedMovieId: string) => savedMovieId !== movieId);
    localStorage.setItem('save_movies', JSON.stringify(updatedSavedMovieIds));
    return true;
  };

