/* eslint-disable max-len */
const Contacts = require('./schemas/shemacontact');

const listContacts = async (userId, query) => {
  const {limit = 20, page = 1, totalPages = 1, sortBy, sortByDesc, filter} = query;
  const {
    docs: contacts,
    totalDocs: total,
    totalPages: Pages,
  } = await Contacts.paginate(
      {owner: userId},
      {
        limit, page, totalPages,
        sort: {
          ...(sortBy ? {[`${sortBy}`]: 1} : {}),
          ...(sortByDesc ? {[`${sortByDesc}`]: -1} : {})
        },
        select: filter ? filter.split('|').join(' ') : '',
        populate: {path: 'owner', select: 'email subscription -_id'},
      },
  );
  return {total, limit: +limit, page: +page, Pages, contacts};
};

const getContactById = async (userId, id) => {
  const result = await Contacts.findOne({_id: id, owner: userId}
  ).populate(
      {
        path: 'owner',
        select: 'email subscription -_id',
      });
  return result;
};
const removeContact = async (userId, id) => {
  const result = await Contacts.findByIdAndRemove({_id: id, owner: userId});
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contacts.create({...body, owner: userId});
  return result;
};

const updateContact = async (userId, id, body) => {
  const result = await Contacts.findByIdAndUpdate(
      {
        _id: id,
        owner: userId
      }, {...body}, {
        new: true,
      }).populate(
      {
        path: 'owner',
        select: 'email subscription -_id',
      });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
