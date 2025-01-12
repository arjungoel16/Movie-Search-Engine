// Purpose: Provide a page for the user to view their saved movies and delete them from their saved list.
//  do not use server to get saved movies

import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import { removeMovie } from '../utils/localStorage';

import React from 'react';
import { GET_ME } from '../utils/queries';

const SavedMovies: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ME);

  console.log('Query data:', data);

  const userData = data?.me || data?.user || {};
  console.log('User data:', userData);
  console.log('Saved Movies:', userData.savedMovies);

  // The useQuery hook automatically executes when the component mounts and will re-fetch data when necessary, making the useEffect hook unnecessary in this case.

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteMovie = async (movieId: any) => {
    const token = Auth.logIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeMovie({
        variables: { movieId },
      });

      removeMovie(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if (error) {
    console.error(error);
    // return <h2>Something went wrong!</h2>;
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData?.username ? (
            <h1>Viewing {userData.username}'s saved movies!</h1>
          ) : (
            <h1>Viewing saved movies!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData?.savedMovies?.length
            ? `Viewing ${userData.savedMovies.length} saved ${
                userData.savedMovies.length === 1 ? 'movie' : 'movies'
              }:`
            : 'You have no saved movies!'}
        </h2>
        <Row>
          {/* {userData?.savedBooks?.map((book: { bookId: string; image?: string; title: string; authors: string[]; description: string }) => { */}
          {userData.savedMovies.map((movie: any) => {
            return (
              <Col md='4'>
                <Card key={movie} border='dark'>
                  {movie.image ? (
                    <Card.Img
                      src={movie.image}
                      alt={`The cover for ${movie.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <p className='small'>Directors: {movie.directors}</p>
                    <Card.Text>{movie.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteMovie(movie.movieId)}
                    >
                      Delete this Movie!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          }
          )}
        </Row>
      </Container>
    </>
  );
}
export default SavedMovies;
