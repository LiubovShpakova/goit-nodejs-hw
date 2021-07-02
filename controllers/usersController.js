/* eslint-disable max-len */
const {findByEmail, create, updateToken, updateSubscUser} = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
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
      },
    });
  } catch (e) {
    next(e);
  }
};
const loginUserController = async (req, res, next) => {
  try {
    const {email, password, subscription = 'starter'} = req.body;
    const user = await findByEmail(email);
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
module.exports = {
  signupUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  subscriptionUserController
};
