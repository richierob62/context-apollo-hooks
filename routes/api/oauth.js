import express from 'express';
import passport from '../../config/passport';

const router = express.Router();

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    // authType: 'reauthenticate',
    scope: ['email'],
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: `http://localhost:${process.env.PORT}/graphql`,
    failureRedirect: `http://localhost:${process.env.PORT}/graphql`,
  })
);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: 'openid profile email',
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `http://localhost:${process.env.PORT}/graphql`,
    failureRedirect: `http://localhost:${process.env.PORT}/graphql`,
  })
);

export default router;
