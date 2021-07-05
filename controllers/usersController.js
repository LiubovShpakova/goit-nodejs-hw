/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const {findByEmail, create, updateToken, updateSubscUser, updateAvatar} = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const FOLDER_AVATARS = process.env.FOLDER_AVATARS;
const {Subscription} = require('../helpers/constants');

const SubscriptionValues = Object.values(Subscription);

const signupUserController = async (req, res, next) => {
  try {
    const user = await findByEmail(req.body.email);
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      });
    }
    const newUser = await create(req.body);
    return res.status(200).json({
      status: 'success',
      code: 200,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
};
const loginUserController = async (req, res, next) => {
  try {
    const {email, password, subscription = 'starter', avatarURL} = req.body;
    const user = await findByEmail(email);
    console.log('loginUserController -> user', user);
    const isValidPassword = await user?.isValidPassword(password);
    if (!user || !isValidPassword) {
      return res.json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong',
      });
    }
    const id = user.id;
    const payload = {id};
    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '7d'} );
    await updateToken(id, token);

    return res.json({status: 'success', code: 200, data: {
      token, user: {
        email,
        subscription,
        avatarURL: user.avatarURL,
      },
    }});
  } catch (e) {
    next(e);
  }
};

const logoutUserController = async (req, res, next) => {
  try {
    const id = req.body.id;
    await updateToken(id, null);
    return res.status(204).json({
      status: 'success',
      code: 204,
    });
  } catch (e) {
    next(e);
  }
};

const currentUserController = async (req, res, next) => {
  try {
    const {email, subscription} = req.user;
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {email, subscription}
    });
  } catch (e) {
    next(e);
  }
};
const subscriptionUserController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (req.body) {
      const user = await updateSubscUser(userId, req.body);

      const {email, subscription} = user;
      const isValidSubsc = SubscriptionValues.some((elem) => elem === subscription);
      // console.log('subscriptionUserController -> isValidSubsc', isValidSubsc);
      if (user && isValidSubsc) {
        return res.status(200).json({
          status: 'success',
          code: 200,
          data: {email, subscription},
        });
      }
      return res.json({status: 'error', code: 404, message: 'Not Found'});
    }
  } catch (e) {
    next(e);
  }
};

const updateAvatarUserController = async (req, res, next) => {
  const userId = req.user.id;
  const avatarURL = await saveAvatarUser(req);
  await updateAvatar(userId, avatarURL);
  return res.status(200).json({
    status: 'success',
    code: 200,
    data: {avatarURL},
  });
};
const saveAvatarUser = async (req) => {
  const userId = req.user.id;
  // console.log('saveAvatarUser -> req.user', req.user);

  // FOLDER_AVATARS
  // req.file
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`;
  const img = await jimp.read(pathFile);
  await img
      .autocrop()
      .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(pathFile);
  try {
    await fs.rename(pathFile, path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar));
  } catch (e) {
    console.log(e);
  }
  console.log('saveAvatarUser -> req.user.avatar', req.user.avatarURL);
  if (req.user.avatarURL.includes(`${FOLDER_AVATARS}/`)) {
    await fs.unlink(path.join(process.cwd(), 'public', req.user.avatarURL));
  }
  return path.join(FOLDER_AVATARS, newNameAvatar).replace('\\', '/');
};

module.exports = {
  signupUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  subscriptionUserController,
  updateAvatarUserController
};
