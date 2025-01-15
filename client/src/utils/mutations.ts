import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($input:UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// saves movies within the users space

export const SAVE_Movie = gql`
mutation SaveMovie($input: MovieInput!) {
  saveMovie(input: $input) {
    _id
    username
    email
 
    seenItMovies {
      _id
      movieId
      title
      overview
      posterPath
      releaseDate
      voteAverage
    }
  }
}`;

// function for removing movies from the users space
export const REMOVE_MOVIE = gql`
  mutation removeMovie($MovieId: ID!) {
    removeMovie(MovieId: $MovieId) {
      _id
      username
      
      savedMovie {
        movieId
        title
      }
    }
  }
`;
