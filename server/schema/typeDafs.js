const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
  }
  type Medic {
    _id: ID!
    name: String
    dosage: Int
    amount: Int
    range: String
    subRange: String
    times: [String]
    queue: [Queue]
    isActive: Boolean
    userId: ID!
  }

  type Queue {
    _id: ID!
    time: String!
    checked: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  input MedicInput {
    name: String
    dosage: Int
    amount: Int
    range: String
    subRange: String
    times: [String]
  }

  input QueueInput {
    time: String!
  }

  type Query {
    medic(medicId: ID!): Medic
    medics: [Medic]
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addMedic(medic: MedicInput!): Medic
    updateMedic(medicId: ID!, medic: MedicInput!): Medic
    toggleIsActive(medicId: ID!): Medic
    checkQueue(medicId: ID!, queueId: ID!): Medic
  }
`;
module.exports = typeDefs;
