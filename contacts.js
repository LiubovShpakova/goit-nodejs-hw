const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const result = await console.table(JSON.parse(data));
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = await JSON.parse(data);
    const result = console.table(
      contacts.filter((contact) => contact.id === contactId)
    );
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = await JSON.parse(data);

    const someContactID = contacts.find((con) => con.id === contactId);
    if (!someContactID)
      return console.warn(
        '\x1B[31m There is no such contactId in the list of contacts!'
      );

    const newList = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newList, null, ' '),
      'utf8'
    );
    const result = console.table(newList);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
async function addContact(name, email, phone) {
  try {
    const contact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = await JSON.parse(data);
    const someContact = contacts.find(
      (con) =>
        con.id === contact.id ||
        con.name === contact.name ||
        con.email === contact.email
    );
    if (someContact) return console.warn('\x1B[31m Contact already exist!');
    const newList = [...contacts, contact];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newList, null, ' '),
      'utf8'
    );
    const result = console.table(newList);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
