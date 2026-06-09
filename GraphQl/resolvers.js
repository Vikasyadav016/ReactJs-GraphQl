const bcrypt = require('bcryptjs');
const { getUsers, saveUsers } = require('./lib/userStore');
const { v4: uuidv4 } = require('uuid');

const resolvers = {
  Query: {
    users: () => {
      return getUsers().map(({ id, name, email }) => ({ id, name, email }));
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      const users = getUsers();
      const emailExists = users.some((user) => user.email.toLowerCase() === input.email.toLowerCase());

      if (emailExists) {
        return {
          success: false,
          message: 'Email is already registered.',
          user: null,
        };
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);
      const newUser = {
        id: uuidv4(),
        name: input.name,
        email: input.email,
        password: hashedPassword,
      };

      users.push(newUser);
      saveUsers(users);

      return {
        success: true,
        message: 'Signup successful.',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      };
    },
  },
};

module.exports = resolvers;
