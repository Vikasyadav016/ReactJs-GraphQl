const studentResolvers = require('./students');
const bookResolvers = require('./books');

module.exports = {
  Query: {
    ...studentResolvers.Query,
    ...bookResolvers.Query,
  },
  Mutation: {
    ...studentResolvers.Mutation,
    ...bookResolvers.Mutation,
  },
};
