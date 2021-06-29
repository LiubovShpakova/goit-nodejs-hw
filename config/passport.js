const passport =require('passport');
const {findById} = require('../model/user');
const {Strategy, ExtractJwt} = require('passport-jwt');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const params = {
  secretOrKey: JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
passport.use(
    new Strategy(params, async (payload, done) => {
      try {
        // console.log('payload', payload);
        const user = await findById(payload.id);
        console.log('user', user);
        if (!user) {
          return done(new Error('User not found'));
        }
        if (!user.token) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }),
);
