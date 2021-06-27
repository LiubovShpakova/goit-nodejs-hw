const Users = require('./schemas/shemauser');

const findById = async (id) => {
  const result = await Users.findById(id);
  return result;
};

const findByEmail = async (email) => {
  const result = await Users.findOne({email});
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

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
};
