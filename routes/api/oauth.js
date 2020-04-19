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
  passport.authenticate('facebook'),
  (req, res) => {
    const user = req.user;
    if (user) {
      const { id, firstName, lastName, email } = user.dataValues;
      res.json({ user: { id, firstName, lastName, email } });
    } else {
      res.json({ errors: [{ auth: false }] });
    }
  }
);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: 'openid profile email',
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  const user = req.user;
  if (user) {
    const { id, firstName, lastName, email } = user.dataValues;
    res.json({ user: { id, firstName, lastName, email } });
  } else {
    res.json({ errors: [{ auth: false }] });
  }
});

export default router;
