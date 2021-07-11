/* eslint-disable max-len */
const Users = require('./schemas/shemauser');

const findById = async (id) => {
  const result = await Users.findById(id);
  return result;
};

const findByEmail = async (email) => {
  const result = await Users.findOne({email});
  return result;
};

const findByVerifyToken = async (verifyToken) => {
  const result = await Users.findOne({verifyToken});
  return result;
};

const create = async (body) => {
  const user = new Users(body);
  return user.save();
};
const updateToken = async (id, token) => {
  const result = await Users.updateOne({_id: id}, {token});
  return result;
};

const updateSubscUser = async (id, body) => {
  const result = await Users.findByIdAndUpdate(id, {...body}, {new: true});
  // console.log('updateSubscUser -> result', result);
  return result;
};
const updateAvatar = async (id, avatarURL) => {
  const result = await Users.updateOne({_id: id}, {avatarURL});
  return result;
};
const updateVerifyToken = async (id, verify, verifyToken) => {
  const result = await Users.updateOne({_id: id}, {verify, verifyToken});
  return result;
};

module.exports = {
  findById,
  findByEmail,
  findByVerifyToken,
  create,
  updateToken,
  updateSubscUser,
  updateAvatar,
  updateVerifyToken,
};
