import React, { useState, useEffect } from "react";
// import { useMutation } from "@apollo/client"; // Assuming you are using Apollo for GraphQL
// import { SAVE_MOVIE } from "../utils/mutations";
import { searchMovies } from "../utils/api";
// Mock mutation, replace with actual mutation if you have one
// Replace with your actual GraphQL mutation if required
import { Container, Row, Col } from "react-bootstrap";
import "./SearchMovies.css";

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
      const response = await searchMovies(
        "6429cb48e921c8274e51fab9b640e9f6",
        searchInput
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching movie data!");
      }

      const data = await response.json();
      console.log(data);

      // Assuming 'data.items' contains movie results
      const movieData = data.results.map((movie: any) => ({
        movieId: movie.id,
        title: movie.title,
        imageUrl: "https://image.tmdb.org/t/p/original" + movie.poster_paths,
      }));

      setSearchedMovie(movieData);
      setSearchInput(""); // Clear the search input
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Method to handle saving a movie to localStorage
  const handleSaveMovie = (movieId: string) => {

    // use graphql save_movie mutation and save to datase
    // useEffect to fetch saved movies from databas to render img/title instead of movie id

    if (savedMovieIds.includes(movieId)) {
      alert("This movie is already saved.");
      return;
    }

    const updatedSavedMovieIds = [...savedMovieIds, movieId];
    setSavedMovieIds(updatedSavedMovieIds); // Update state
  };

  return (
    <Container>
      <Row>
        <h1>Search for Movies</h1>
        <form onSubmit={handleFormSubmit} className="container">
          <input
            type="text"
            placeholder="Search for a movie"
            value={searchInput}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </Row>
      <Row>
        <Col xs={9}>
          <Container className="movie-container text-center">
            <h2 className="text-center">Search Results</h2>
            <ul className="d-flex flex-wrap">
              {searchedMovie.map((movie) => (
                <li key={movie.movieId} className="card">
                  <h4>{movie.title}</h4>
                  <figure>
                    <img className="img-fluid" src={movie.imageUrl}></img>
                  </figure>
                  <button
                    className="btn btn-success"
                    onClick={() => handleSaveMovie(movie.movieId)}
                  >
                    Save Movie
                  </button>
                </li>
              ))}
            </ul>
          </Container>
        </Col>
        <Col>
          <Container>
            <h2>Saved Movies</h2>
            <ul>
              {savedMovieIds.map((movieId) => (
                <li key={movieId}>{movieId}</li>
              ))}
            </ul>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchMovies;
