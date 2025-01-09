    import React from "react";
    import {
    Jumbotron,
    Container,
    CardColumns,
    Card,
    Button,
    } from "react-bootstrap";
    import { useQuery, useMutation } from "@apollo/client";

    import Auth from "../utils/auth";
    import { removeMovieId } from "../utils/localStorage";
    import { GET_ME } from "../utils/queries";
    import {REMOVE_MOVIE} from "../utils/mutations";
    const SaveMovies = () => {
    const { loading, data } = useQuery(GET_ME);
    // create state to hold saved movieId values
    const userData = data?.me;
    const [deleteMovie] = useMutation(REMOVE_MOVIE);
    const [removeMovieId] = useMutation(REMOVE_MOVIE_ID);
// create function that accepts the movie's mongo _id value as param and deletes the movie from the database
    const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      try {
        await deleteMovie({
          variables: {movieId: movieId},
        });
        // when the data is updated, we delete the movie from the local storage
        removeBookId(movieId);
      } catch (err) {
        console.error(err);
      }
    };
    if (loading) {
      return <h2>LOADING...</h2>;
    }

    return (
      <>
        <Jumbotron fluid className="text-light bg-dark">
          <Container>
            <h1>Viewing saved books!</h1>
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {userData.savedBooks.length
              ? `Viewing ${userData.savedBooks.length} saved ${
                  userData.savedBooks.length === 1 ? "book" : "books"
                }:`
              : "You have no saved movies!"}
          </h2>
          <CardColumns>
            {userData.SaveMovies.map((movie) => {
              return (
                <Card key={movie.movieId} border="dark">
                  {movie.image ? (
                    <Card.Img
                      src={movie.image}
                      alt={`The cover for ${movie.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <p className="small">Directors: {movie.Director}</p>
                    <Card.Text>{movie.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteMovie(movie.movieId)}
                    >
                      Delete this movie!
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Container>
      </>
    );
  };
  export default SaveMovies;
