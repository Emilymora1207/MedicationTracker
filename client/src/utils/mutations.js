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
  mutation addMedic($medic: MedicInput!) {
    addMedic(medic: $medic) {
      _id
      name
    }
  }
`;

export const REMOVE_MED = gql`
  mutation removeMED($medic: String!) {
    removeMed(medic: $medic) {
      _id
      name
    }
  }
`;

export const UPDATE_MED = gql`
  mutation updateMED($medic: String!) {
    updateMed(medic: $medic) {
      _id
      name
    }
  }
`;