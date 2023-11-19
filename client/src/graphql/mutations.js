import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!, $email: String!) {
    register(username: $username, password: $password, email: $email) {
      id
      username
      email
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;
