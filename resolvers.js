export default {
  Query: {
    currentUser: async (_, __, { getUser }) => getUser(),
  },
  Mutation: {
    logout: (_, __, context) => {
      context.logout();
      return true;
    },
    login: async (_, { email, password }, context) => {
      try {
        if (!email || !password) throw new Error();
        const { user } = await context.authenticate('graphql-local', {
          email,
          password,
        });
        await context.login(user);
        return { user };
      } catch (e) {
        throw new Error('Invalid Credentials');
      }
    },
    signup: async (
      _,
      { firstName, lastName, email, password },
      { db, login }
    ) => {
      const userWithEmail = await db.User.findOne({
        where: {
          email,
        },
      });
      if (userWithEmail) {
        throw new Error('User with email already exists');
      }

      if (!email || !password) throw new Error('Email and passord required');

      let newUser = {
        firstName,
        lastName,
        email,
        password,
      };

      newUser = await db.User.create(newUser);

      await login(newUser);

      return { user: newUser };
    },
  },
};
