const { gql } = require('graphql-tag');

module.exports = gql`
  type Student {
    id: ID!
    name: String!
    email: String!
    age: Int!
    course: String!
  }

  input StudentCreateInput {
    name: String!
    email: String!
    age: Int!
    course: String!
  }

  input StudentUpdateInput {
    name: String
    email: String
    age: Int
    course: String
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    publishedYear: Int!
  }

  input BookCreateInput {
    title: String!
    author: String!
    publishedYear: Int!
  }

  input BookUpdateInput {
    title: String
    author: String
    publishedYear: Int
  }

  type Query {
    students: [Student!]!
    student(id: ID!): Student
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createStudent(input: StudentCreateInput!): Student!
    updateStudent(id: ID!, input: StudentUpdateInput!): Student!
    deleteStudent(id: ID!): Boolean!
    createBook(input: BookCreateInput!): Book!
    updateBook(id: ID!, input: BookUpdateInput!): Book!
    deleteBook(id: ID!): Boolean!
  }
`;
