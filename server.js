import 'dotenv/config';

import { ApolloServer } from 'apollo-server-express';
import ExpressMySQLSession from 'express-mysql-session';
import apiRoutes from './routes/api';
import { buildContext } from 'graphql-passport';
import cors from 'cors';
import db from './models';
import express from 'express';
import passport from './config/passport';
import resolvers from './resolvers';
import session from 'express-session';
import typeDefs from './schema';
import { v4 as uuid } from 'uuid';

// mysql session store
// --------------------------------------------------------------------------
const MySQLStoreCreator = ExpressMySQLSession(session);
const mySQLStoreOptions = {
  host: process.env.SESSION_STORE_HOST,
  port: process.env.SESSION_STORE_PORT,
  user: process.env.SESSION_STORE_USER,
  password: process.env.SESSION_STORE_PASSWORD,
  database: process.env.SESSION_STORE_DATABASE,
  clearExpired: true,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000,
  createDatabaseTable: true,
  connectionLimit: 1,
};
const sessionStore = new MySQLStoreCreator(mySQLStoreOptions);

// express server & middleware
// --------------------------------------------------------------------------
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    genid: (req) => uuid(),
    key: process.env.SESSION_COOKIE_NAME,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
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

app.use('/', apiRoutes);

// apollo server
// --------------------------------------------------------------------------
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
