import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      medic
    }
  }
`;

export const QUERY_SINGLE_MEDIC = gql`
  query singleMedic($medicId: ID!) {
    medic(medicId: $medicId) {
      medic
    }
  }
`;

export const QUERY_MEDICS = gql`
  query allMedics {
    medics {
      medic
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      medic
    }
  }
`;