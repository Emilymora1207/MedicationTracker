import { gql } from '@apollo/client';

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

export const ADD_MED = gql`
  mutation addMed($userId: ID!, $Medic: String!) {
    addMed(userId: $userId, medic: $medic) {
      _id
      name
      medics
    }
  }
`;

export const REMOVE_MED = gql`
  mutation removeMED($medic: String!) {
    removeMed(medic: $medic) {
      _id
      name
      medics
    }
  }
`;