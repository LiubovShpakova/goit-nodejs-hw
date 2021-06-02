// import * as fs from "fs/promises";
// import * as path from "path";

const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join('db', 'contacts.json');

function listContacts() {
  // ...твой код
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
