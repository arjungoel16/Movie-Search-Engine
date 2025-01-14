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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// saves movies within the users space
export const SAVE_MOVIE = gql`
mutation saveMovie($input: MovieInput!) {
  saveMovie(input: $input) {
    user {
      _id
      username
      savedMovies {
        movieId
        title
      }
    }
  }
}
`;


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
