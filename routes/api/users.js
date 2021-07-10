/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const express = require('express');
const router = new express.Router();
const {
  signupUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  subscriptionUserController,
  updateAvatarUserController,
  verifyTokenUserController,
  verifyRepeatUserController,
} = require('../../controllers/usersController');
const {
  validatCreateUser,
  validatLoginUser,
} = require('./validation');
const guard = require('../../helpers/guard');
const rateLimit = require('express-rate-limit');
const {Limiter} = require('../../helpers/constants');
const uploadAvatar = require('../../helpers/upload-avatar');
// router.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

// eslint-disable-next-line max-len
router.post('/signup', rateLimit(Limiter), validatCreateUser, signupUserController);
router.post('/login', validatLoginUser, loginUserController);
router.post('/logout', logoutUserController);
router.get('/current', guard, currentUserController);
router.patch('/subscription', guard, subscriptionUserController);
router.patch('/avatars', guard, uploadAvatar.single('avatar'), updateAvatarUserController);
router.get('/auth/verify/:verificationToken', verifyTokenUserController);
router.post('/verify', verifyRepeatUserController);

module.exports = router;
