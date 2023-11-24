import { gql } from "@apollo/client";

export const CHECK_AUTH = gql`
  query CheckAuth {
    checkAuth {
      id
      token
      user
    }
  }
`;

export const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const USERS = gql`
  query {
    users {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const COMPANY = gql`
  query ($companyId: ID!) {
    company(id: $companyId) {
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
export const COMPANIES = gql`
  query Companies {
    companies {
      id
      name
      updatedAt
      createdAt
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

export const ASSET = gql`
  query ($assetId: ID!) {
    asset(id: $assetId) {
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

export const ASSETS = gql`
  query {
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
`;
