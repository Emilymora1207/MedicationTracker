import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
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

export const UPDATE_MED = gql`
  mutation updateMED($medic: String!) {
    updateMed(medic: $medic) {
      _id
      name
      medics
    }
  }
`;