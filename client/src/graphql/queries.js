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
    }
  }
`;
export const USERS = gql`
  query {
    users {
      id
      username
      email
      password
    }
  }
`;
export const COMPANY = gql`
  query ($companyId: ID!) {
    company(id: $companyId) {
      id
      name
      assets {
        id
        device
        serialnumber
        description
        assignee
        location
        companyId
      }
    }
  }
`;
export const COMPANIES = gql`
  query {
    companies {
      id
      name
      assets {
        id
        device
        serialnumber
        description
        assignee
        location
        companyId
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
    }
  }
`;
