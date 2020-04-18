import 'dotenv/config';

import FacebookStrategy from 'passport-facebook';
import { GraphQLLocalStrategy } from 'graphql-passport';
import PassportGoogleOAuth from 'passport-google-oauth';
import bcrypt from 'bcryptjs';
import db from '../models';
import passport from 'passport';

const GoogleStrategy = PassportGoogleOAuth.OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const matchingUser = await db.User.findOne({
    where: {
      id: id,
    },
  });
  done(null, matchingUser);
});

// username & password login
passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    let error = new Error('Invalid credentials');
    try {
      const user = await db.User.findOne({ where: { email } });
      const valid = bcrypt.compareSync(password, user.password);
      if (user && valid) {
        error = null;
      }
      done(error, user);
    } catch (e) {
      done(error, null);
    }
  })
);

// Facebook auth
const facebookOptions = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `http://localhost:${process.env.PORT}/auth/facebook/callback`,
  profileFields: ['id', 'email', 'first_name', 'last_name'],
};

const facebookCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    let email = profile.emails[0].value;
    let user = await db.User.findOne({ where: { email } });

    if (!user) {
      user = {
        facebookId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email,
      };

      user = await db.User.create(user);
    }
    return done(null, user);
  } catch (e) {
    const error = new Error('Failure logging in with Facebook');
    return done(error, null);
  }
};

passport.use(new FacebookStrategy(facebookOptions, facebookCallback));

// google auth
const googleCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    let email = profile.emails.filter((e) => e.verified)[0].value;
    let user = await db.User.findOne({ where: { email } });

    if (!user) {
      user = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email,
      };
      user = await db.User.create(user);
    }
    return done(null, user);
  } catch (e) {
    const error = new Error('Failure logging in with Google');
    return done(error, null);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CONSUMER_KEY,
      clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
    },
    googleCallback
  )
);

export default passport;
