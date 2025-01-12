import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client"; // Assuming you are using Apollo for GraphQL
import { SAVE_MOVIE } from '../utils/mut';
// Mock mutation, replace with actual mutation if you have one
 // Replace with your actual GraphQL mutation if required

const SearchMovies = () => {
  // State for holding returned movie data from the search API
  const [searchedMovie, setSearchedMovie] = useState<any[]>([]);
  // State for holding the input search text
  const [searchInput, setSearchInput] = useState<string>("");
  // State to hold saved movie IDs (from localStorage initially)
  const [savedMovieIds, setSavedMovieIds] = useState<string[]>(() => {
    // Load saved movie IDs from localStorage on component mount
    const savedMovies = localStorage.getItem("savedMovies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  // Mutation hook for saving movies (optional, if using GraphQL)
  // const [saveMovie] = useMutation(SAVE_MOVIE);

  // useEffect hook to save `savedMovieIds` to localStorage whenever they change
  useEffect(() => {
    if (savedMovieIds.length > 0) {
      // Save to localStorage
      localStorage.setItem("savedMovies", JSON.stringify(savedMovieIds));
    }
  }, [savedMovieIds]);

  // Method to handle search input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Method to handle form submission for searching movies
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      return; // Return early if input is empty
    }

    try {
      const response = await fetch(`https://api.example.com/search?query=${searchInput}`);

      if (!response.ok) {
        throw new Error("Something went wrong while fetching movie data!");
      }

      const data = await response.json();

      // Assuming 'data.items' contains movie results
      const movieData = data.items.map((movie: any) => ({
        movieId: movie.id,
        title: movie.volumeInfo.title,
      }));

      setSearchedMovie(movieData);
      setSearchInput(""); // Clear the search input
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Method to handle saving a movie to localStorage
  const handleSaveMovie = (movieId: string) => {
    if (savedMovieIds.includes(movieId)) {
      alert("This movie is already saved.");
      return;
    }

    const updatedSavedMovieIds = [...savedMovieIds, movieId];
    setSavedMovieIds(updatedSavedMovieIds); // Update state
  };

  return (
    <div>
      <h1>Search for Movies</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchInput}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <h2>Search Results</h2>
        <ul>
          {searchedMovie.map((movie) => (
            <li key={movie.movieId}>
              <span>{movie.title}</span>
              <button onClick={() => handleSaveMovie(movie.movieId)}>
                Save
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Saved Movies</h2>
        <ul>
          {savedMovieIds.map((movieId) => (
            <li key={movieId}>{movieId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchMovies;
