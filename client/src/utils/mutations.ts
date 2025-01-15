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
export const SAVE_Movie = gql`
  mutation saveMovie(
    $authors: [String]!
    $description: String!
    $title: String!
    $movieId: ID!
    
  ) {
     saveMovie(
      title: $title
      movieId: $movieId
    ) {
      _id
      username
    
      savedMovie {
        movieId
        title
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
