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
  mutation CreateCompany($name: String!, $description: String!) {
    createCompany(name: $name, description: $description) {
      id
      name
      description
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
export const DELETE_COMPANY = gql`
  mutation DeleteCompany($deleteCompanyId: ID!) {
    deleteCompany(id: $deleteCompanyId)
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

export const DELETE_ASSET = gql`
  mutation DeleteAsset($deleteAssetId: ID!) {
    deleteAsset(id: $deleteAssetId)
  }
`;

export const UPDATE_ASSET = gql`
  mutation UpdateAsset(
    $updateAssetId: ID!
    $device: String!
    $description: String!
    $serialnumber: String
    $assignee: String
    $location: String
  ) {
    updateAsset(
      id: $updateAssetId
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
