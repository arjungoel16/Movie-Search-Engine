export const getSavedMovieIds = () => {
  // allows us to store the movie
  const savedMovieIds = localStorage.getItem('save_movies')
    ? JSON.parse(localStorage.getItem('save_movies'))
    : [];

  return savedMovieIds;
};


// allows us to export the movie ids
export const saveMovieIds = (MovieIdArr: string | any[]) => {
  if (MovieIdArr.length) {
    
    localStorage.setItem('save_movie', JSON.stringify(MovieIdArr));
  } else {
    // if there is no movie name, remove it
    localStorage.removeItem('save_movies');
  }
};

export const removeMovieId = (_movieId: any) => {
  const savedMovieIds = localStorage.getItem('saved_movies')

  if (!saveMovieIds) {
    return false;
  } 
  

  // updating the movies in the local storage
  const updatedSavedMovieIds = JSON.parse (savedMovieIds)?.filter((savedMovieId: any) => savedMovieId !== movieId);
  localStorage.setItem('save_movies', JSON.stringify(updatedSavedMovieIds));

  return true;

};
