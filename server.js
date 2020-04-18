import 'dotenv/config';

import { ApolloServer } from 'apollo-server-express';
import { buildContext } from 'graphql-passport';
import cors from 'cors';
import db from './models';
import express from 'express';
import passport from './config/passport';
import resolvers from './resolvers';
import routes from './routes/api';
import session from 'express-session';
import typeDefs from './schema';
import { v4 as uuid } from 'uuid';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    genid: (req) => uuid(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
} else {
  app.use(express.static('public'));
}

app.use('/', routes);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res, db }),
});

server.applyMiddleware({ app });

db.sequelize.sync({ force: true }).then(() => {
  app.listen({ port: process.env.PORT }, () => {
    console.log(`Server ready at http://localhost:${process.env.PORT}`);
  });
});
