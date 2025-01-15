// Purpose: This file contains the code for the search movies page. This page allows the user to search for movies and save them to their account. The user can search for movies by title and save them to their account. The user can also view the movies they have saved to their account.
import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";
import { searchGoogleMovies } from "../utils/api";
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import { SAVE_MOVIE } from "../utils/mutations";

const SearchMovies = () => {
  // create state for holding returned google api data
  const [searchedMovie, setSearchedMovie] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  const [saveMovie] = useMutation(SAVE_Movie);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleMovie(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const movieData = items.map((movie) => ({
        movieId: movie.id,
        title: book.volumeInfo.title,
        // Director: book.volumeInfo.Director || ["No Director to display"],
      }));

      setSearchedMovie(movieData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

//   this function allows the movie to be saved to the user's account
  const handleSaveMovie = async (movieId) => {

    const movieToSave = searchedmovie.find((movie) => movie.movieId === movieId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    console.log(movieToSave);

    try {
      await saveMovie({
        variables: { ...movieToSave },
      });

      // if book successfully saves to user's account, save book id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for movie!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={10} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a movie"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedMovie.length} results:`
            : "Search for a book to begin"}
        </h2>
        <CardColumns>
          {searchedMovie.map((movie) => {
            return (
              <Card key={movie.movieId} border="dark">
                {movie.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some(
                        (savedMovieId) => savedMovieId === movie.movieId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveMovie(movie.movieId)}
                    >
                      {savedMovieId?.some(
                        (savedMovieId) => savedMovieId === movie.movieId
                      )
                        ? "This movie has already been saved!"
                        : "Save this movie!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchMovies;
