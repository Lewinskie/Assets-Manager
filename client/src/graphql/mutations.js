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
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const CREATE_COMPANY = gql`
  mutation CreateCompany($name: String!) {
    createCompany(name: $name) {
      id
      name
      createdAt
      updatedAt
      assets {
        id
        device
        serialnumber
        description
        assignee
        location
        companyId
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_ASSET = gql`
  mutation CreateAsset(
    $companyId: String!
    $device: String!
    $description: String!
    $serialnumber: String!
    $assignee: String!
    $location: String!
  ) {
    createAsset(
      companyId: $companyId
      device: $device
      description: $description
      serialnumber: $serialnumber
      assignee: $assignee
      location: $location
    ) {
      id
      device
      serialnumber
      description
      assignee
      location
      companyId
      createdAt
      updatedAt
    }
  }
`;
