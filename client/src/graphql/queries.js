import { gql } from "@apollo/client";

export const CHECK_AUTH = gql`
  query {
    checkAuth {
      id
      username
      email
    }
  }
`;

export const USER = gql`
  query {
    user {
      id
      username
      email
    }
  }
`;
