import 'dotenv/config';

import { ApolloServer } from 'apollo-server-express';
import apiRoutes from './routes/api';
import { buildContext } from 'graphql-passport';
import connectRedis from 'connect-redis';
import cors from 'cors';
import db from './models';
import express from 'express';
import passport from './config/passport';
import redis from 'redis';
import resolvers from './resolvers';
import session from 'express-session';
import typeDefs from './schema';
import { v4 as uuid } from 'uuid';

let RedisStore = connectRedis(session);
let redisClient = redis.createClient();

redisClient.on('connect', function () {
  console.log('Redis client connected');
});

redisClient.on('error', function (err) {
  console.log('Redis related error ' + err);
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    genid: (req) => uuid(),
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
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
