const express = require('express');
const router = new express.Router();
const {
  signupUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
} = require('../../controllers/usersController');
const {
  validatCreateUser,
  validatLoginUser,
} = require('./validation');
const guard = require('../../helpers/guard');
const rateLimit = require('express-rate-limit');
const {Limiter} = require('../../helpers/constants');
// router.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

// eslint-disable-next-line max-len
router.post('/signup', rateLimit(Limiter), validatCreateUser, signupUserController);
router.post('/login', validatLoginUser, loginUserController);
router.post('/logout', logoutUserController);
router.get('/current', guard, currentUserController);

module.exports = router;
