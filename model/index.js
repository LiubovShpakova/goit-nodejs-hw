const fs = require('fs/promises');
// const contacts = require('./contacts.json');
const {v4: uuidv4} = require('uuid');
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  const result = JSON.parse(data);
  return result;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(data);
  const result = contacts.find((item) => item.id.toString() === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(data);
  const remContact = contacts.find((item) => item.id.toString() == contactId);
  const result = contacts.filter((item) => item.id.toString() !== contactId);
  if (!remContact) {
    return false;
  }
  await fs.writeFile(contactsPath, JSON.stringify(result, null, ' '), 'utf8');
  return true;
};

const addContact = async (body) => {
  const id = uuidv4();
  const newContact = {
    id,
    ...body,
  };
  const data = await fs.readFile(contactsPath, 'utf8');
  const result = JSON.parse(data);
  result.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(result, null, ' '), 'utf8');
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, 'utf8');
  const result = JSON.parse(data);
  const updateCont = result.find((item) => item.id.toString() === contactId);
  if (!updateCont) {
    return null;
  }
  Object.assign(updateCont, body);
  await fs.writeFile(contactsPath, JSON.stringify(result, null, ' '), 'utf8');

  return updateCont;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
