    import React from "react";
    import {
    Jumbotron, //this one is no longer in the react library
    Container,
    CardColumns, //this one is no longer in the react library
    Card,
    Button,
    } from "react-bootstrap";
    import { useQuery, useMutation } from "@apollo/client";
//     import React from "react";
//     import {
//     Jumbotron,
//     Container,
//     CardColumns,
//     Card,
//     Button,
//     } from "react-bootstrap";
//     import { useQuery, useMutation } from "@apollo/client";

//     import Auth from "../utils/auth";
//     import { removeMovieId } from "../utils/localStorage";
//     import { GET_ME } from "../utils/queries";
//     import {REMOVE_MOVIE} from "../utils/mutations";
//     const SaveMovies = () => {
//     const { loading, data } = useQuery(GET_ME);
//     // create state to hold saved movieId values
//     const userData = data?.me;
//     const [deleteMovie] = useMutation(REMOVE_MOVIE);
//     const [removeMovieId] = useMutation(REMOVE_MOVIE_ID);
// // create function that accepts the movie's mongo _id value as param and deletes the movie from the database
//     const handleDeleteMovie = async (movieId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//       if (!token) {
//         return false;
//       }

//       try {
//         await deleteMovie({
//           variables: {movieId: movieId},
//         });
//         // when the data is updated, we delete the movie from the local storage
//         removeBookId(movieId);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     if (loading) {
//       return <h2>LOADING...</h2>;
//     }

//     return (
//       <>
//         <Jumbotron fluid className="text-light bg-dark">
//           <Container>
//             <h1>Viewing saved books!</h1>
//           </Container>
//         </Jumbotron>
//         <Container>
//           <h2>
//             {userData.savedBooks.length
//               ? `Viewing ${userData.savedBooks.length} saved ${
//                   userData.savedBooks.length === 1 ? "book" : "books"
//                 }:`
//               : "You have no saved movies!"}
//           </h2>
//           <CardColumns>
//             {userData.SaveMovies.map((movie) => {
//               return (
//                 <Card key={movie.movieId} border="dark">
//                   {movie.image ? (
//                     <Card.Img
//                       src={movie.image}
//                       alt={`The cover for ${movie.title}`}
//                       variant="top"
//                     />
//                   ) : null}
//                   <Card.Body>
//                     <Card.Title>{movie.title}</Card.Title>
//                     <p className="small">Directors: {movie.Director}</p>
//                     <Card.Text>{movie.description}</Card.Text>
//                     <Button
//                       className="btn-block btn-danger"
//                       onClick={() => handleDeleteMovie(movie.movieId)}
//                     >
//                       Delete this movie!
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               );
//             })}
//           </CardColumns>
//         </Container>
//       </>
//     );
//   };
//   export default SaveMovies;


// import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
// import { getMe, removeBook } from '../utils/API';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';
import type { User } from '../models/user';
import { REMOVE_MOVIE } from '../utils/mutations';
import { useParams } from 'react-router-dom';

import React from 'react';

const SavedMovies: React.FC = () => {
  const { username: userParam } = useParams();
  const { loading, error, data } = useQuery(GET_ME);
  const [removeMovie] = useMutation(REMOVE_MOVIE, {
    refetchQueries: [{ query: GET_ME, variables: { username: userParam } }],
  });

  console.log('Query data:', data);

  const userData: User =data?.me || data?.user || {};
  console.log('User data:', userData);
  console.log('Saved Movies:', userData.savedMovies);

    // The useQuery hook automatically executes when the component mounts and will re-fetch data when necessary, making the useEffect hook unnecessary in this case.

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteMovie = async (movieId: string) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      try {
        await removeMovie({
          variables: { movieId },
        });

        removeMovieId(movieId);
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
    return <h2>Error: {error.message}</h2>
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
          {userData.savedMovies.map((movie) => {    //changed to check for savedBooks
            return (
              <Col md='4'>
                <Card key={movie.movieId} border='dark'>
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
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedMovies;
